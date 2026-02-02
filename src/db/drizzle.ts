import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { upstashCache } from "drizzle-orm/cache/upstash";
import * as schema from "@root/drizzle/schema";
import { relations } from "@root/drizzle/relations";
import ws from "ws";

if (!process.env.NETLIFY) {
  neonConfig.webSocketConstructor = ws;
}

const sql = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = drizzle({
  client: sql,
  cache: upstashCache({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
    global: true,
    config: {
      // 5 minutes
      ex: 60 * 5,
    },
  }),
  schema,
  relations,
});
