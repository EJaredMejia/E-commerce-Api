import { type SQL, sql, type Column } from "drizzle-orm";
type JsonBuildObjectParam = Record<string, Column | SQL>;

interface JsonAggParams<T extends JsonBuildObjectParam> {
  columnsMap: T;
  filter: SQL;
}

type InferJsonBuildObjectParam<T extends JsonBuildObjectParam> =
  T extends JsonBuildObjectParam
    ? {
        [K in keyof T]: T[K] extends Column
          ? T[K]["_"]["data"]
          : T[K] extends SQL<infer TType>
            ? TType
            : never;
      }
    : never;
export function jsonAgg<T extends JsonBuildObjectParam>({
  columnsMap,
  filter,
}: JsonAggParams<T>) {
  return sql<InferJsonBuildObjectParam<T>[]>`
              COALESCE(
                json_agg(${jsonBuildObject(columnsMap)}) FILTER (WHERE ${filter}),
                '[]'
              )`;
}

export function jsonBuildObject<T extends JsonBuildObjectParam>(columnsMap: T) {
  const chunks = Object.entries(columnsMap).map(([key, column]) => {
    // We use sql.raw for the key to keep it as a string literal in SQL
    // and the column object directly so Drizzle handles the mapping
    return sql`'${sql.raw(key)}', ${column}`;
  });
  return sql<
    InferJsonBuildObjectParam<T>
  >`json_build_object(${sql.join(chunks, sql`, `)})`;
}
