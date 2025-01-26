const db = require('../config/database');

class User {
static async findAll() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
}

static async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
}

static async create(userData) {
    const { name, email, password } = userData;
    const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password]
    );
    return { id: result.insertId, name, email };
}

static async update(id, userData) {
    const { name, email } = userData;
    await db.query(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, id]
    );
    return this.findById(id);
}

static async delete(id) {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
}

module.exports = User;

