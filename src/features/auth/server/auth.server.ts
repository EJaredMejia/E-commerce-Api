import { db } from "@/db/drizzle";
import { users } from "@root/drizzle/schema";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import bcrypt from "bcrypt";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { useAppSession } from "../utils/auth.utils";

const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const login = createServerFn({ method: "POST" })
  .inputValidator(loginSchema)
  .handler(async ({ data }) => {
    const [user] = await db
      .select()
      .from(users)
      .where(and(eq(users.email, data.email), eq(users.status, "active")));

    if (!user) {
      throw notFound({ data: { message: "User not found" } });
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const session = await useAppSession();

    await session.update({
      userId: user.id,
    });

    return {
      id: user.id,
      email: user.email,
      name: user.username,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  });

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useAppSession();
  await session.clear();
});

export const getCurrentUser = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data } = await useAppSession();

    if (!data.userId) {
      return null;
    }

    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.username,
        role: users.role,
        firstName: users.firstName,
        lastName: users.lastName,
      })
      .from(users)
      .where(eq(users.id, data.userId));

    return user || null;
  },
);
const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
});

export const createUser = createServerFn({ method: "POST" })
  .inputValidator(createUserSchema)
  .handler(async ({ data }) => {
    const { name, email, password, firstName, lastName, role } = data;

    const [userExist] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email));

    if (userExist) {
      throw Response.json(
        { message: "email is already taken" },
        { status: 409 },
      );
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.insert(users).values({
      username: name,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: "normal",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { status: "success" };
  });
