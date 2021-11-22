const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: process.env.POSTGRES_HOST,
    database: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

export default class Database {
    async getTodos(): Promise<object[]> {
        const result = await pool.query('SELECT * FROM todos');
        return result.rows.map(row => row.todo);
    }

    async addTodo(todo: string): Promise<void> {
        await pool.query('INSERT INTO todos (todo) VALUES ($1)', [todo]);
    }
}
