const db = require('../config/database');

const BookType = {
    // 获取所有图书类型
    getAll: async () => {
        const sql = `SELECT * FROM book_type ORDER BY id`;
        const [rows] = await db.query(sql);
        return rows;
    },

    // 根据ID获取图书类型
    getById: async (id) => {
        const sql = `SELECT * FROM book_type WHERE id = ?`;
        const [rows] = await db.query(sql, [id]);
        return rows[0];
    }
};

module.exports = BookType;
