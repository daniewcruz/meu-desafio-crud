import { Pool } from 'pg';

// Detecta ambiente Vercel (usa POSTGRES_URL) vs desenvolvimento local (usa variáveis DB_*)
const isVercel = !!process.env.POSTGRES_URL;

// Pool local (somente quando não estiver na Vercel)
const localPool = !isVercel
  ? new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      // Opcional: habilitar SSL no local se necessário (ex.: bancos remotos)
      ssl:
        process.env.DB_SSL?.toLowerCase() === 'true'
          ? { rejectUnauthorized: false }
          : undefined,
    })
  : undefined;

/**
 * query(text, params)
 * - Em Vercel: usa @vercel/postgres com POSTGRES_URL (pool/SSL gerenciados automaticamente)
 * - Local: usa node-postgres (pg) com variáveis DB_*
 */
export async function query(text: string, params?: any[]) {
  if (isVercel) {
    const { sql } = await import('@vercel/postgres');
    // @vercel/postgres expõe .query para assinatura compatível com pg
    const res = await sql.query(text, params as any[]);
    return res as unknown as { rows: any[] };
  }

  if (!localPool) throw new Error('Pool local não inicializado');

  const client = await localPool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}
