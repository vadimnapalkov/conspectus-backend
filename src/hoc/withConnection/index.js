import { createConnection } from 'typeorm';

export function withConnection(func) {
  return async function connected(...args) {
    const connection = await createConnection();
    await func(...args);
    await connection.close();
  };
}
