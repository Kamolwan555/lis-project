import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: 'postgres://postgres:password@db:5432/mydb'
});

export default pool;