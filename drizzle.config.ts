import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./drizzle/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: process.env["TURSO_DATABASE_URL"] as string || "file:./drizzle/dev.db",
    authToken: process.env["TURSO_AUTH_TOKEN"] as string,
  },
});
