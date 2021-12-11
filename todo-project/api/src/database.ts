import fetch from 'node-fetch';

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
        const result = await pool.query('SELECT * FROM todos ORDER BY id');
        return result.rows;
    }

    async addTodo(todo: string, skipValidation: boolean = false): Promise<void> {
        if (todo.length > 140 && !skipValidation) {
            console.error(todo + ' is toooooo long');
            console.error('Maximum length of TODO is 140 characters');
            return;
        }

        console.log('Added todo "' + todo + '"');
        await pool.query('INSERT INTO todos (todo) VALUES ($1)', [todo]);
    }

    async updateTodoStatus(id: bigint, is_done: boolean): Promise<void> {
        console.log('Updated todo #' + id + ', new status is: ' + is_done);
        await pool.query('UPDATE todos SET is_done = $1 WHERE id = $2', [is_done, id]);
    }

    async addDailyTodo() {
        const response = await fetch('https://en.wikipedia.org/wiki/Special:Random', {redirect: 'manual'});
        const pageUrl = response.headers.get('location');

        await this.addTodo('Please visit <a target="_blank" href="' + pageUrl + '">' + decodeURIComponent(pageUrl) + '</a> on ' + (new Date()).toDateString(), true);
    }
}
