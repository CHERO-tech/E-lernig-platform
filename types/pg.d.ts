// Minimal ambient types for the `pg` package. @types/pg couldn't be installed
// (registry connectivity issues in this environment) — this covers only the
// surface lib/db/client.ts and lib/db/users.ts actually use. Safe to delete
// once `npm install -D @types/pg` succeeds in an environment with reliable
// network access; the real types package is a strict superset of this.
declare module "pg" {
  export interface QueryResult<T = unknown> {
    rows: T[];
    rowCount: number | null;
  }

  export interface PoolConfig {
    connectionString?: string;
    max?: number;
  }

  export class Pool {
    constructor(config?: PoolConfig);
    query<T = unknown>(text: string, params?: unknown[]): Promise<QueryResult<T>>;
    end(): Promise<void>;
  }

  export interface ClientConfig {
    connectionString?: string;
  }

  export class Client {
    constructor(config?: ClientConfig);
    connect(): Promise<void>;
    query<T = unknown>(text: string, params?: unknown[]): Promise<QueryResult<T>>;
    end(): Promise<void>;
  }

  const pg: { Pool: typeof Pool; Client: typeof Client };
  export default pg;
}
