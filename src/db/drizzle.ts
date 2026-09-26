import { createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@root/drizzle/schema";
import { relations } from "@root/drizzle/relations";

const url = process.env["TURSO_DATABASE_URL"] || "file:./drizzle/dev.db";
const authToken = process.env["TURSO_AUTH_TOKEN"] || "";

const client = createClient({
  url,
  authToken,
});

export const db = drizzle({
  client,
  schema,
  relations,
});
