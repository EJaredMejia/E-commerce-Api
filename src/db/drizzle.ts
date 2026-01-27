import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { upstashCache } from "drizzle-orm/cache/upstash";
import * as schema from "@root/drizzle/schema";
import { relations } from "@root/drizzle/relations";

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle({
  client: sql,
  cache: upstashCache({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
    global: true,
    config: {
      // 2 minutes
      ex: 60 * 2,
    },
  }),
  schema,
  relations,
});
