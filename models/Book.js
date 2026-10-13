const db = require('../config/database');

const Book = {
    // 获取图书列表（分页 + 搜索）
    getList: async (page = 1, keyword = '', pageSize = 5) => {
        const offset = (page - 1) * pageSize;
        let sql = `
            SELECT b.*, t.typeName 
            FROM book_info b 
            LEFT JOIN book_type t ON b.bookType = t.id 
        `;
        const params = [];
        
        if (keyword) {
            sql += `WHERE b.bookName LIKE ? `;
            params.push(`%${keyword}%`);
        }
        
        sql += `ORDER BY b.creationTime DESC LIMIT ? OFFSET ?`;
        params.push(pageSize, offset);
        
        const [rows] = await db.query(sql, params);
        return rows;
    },

    // 获取总数（用于分页）
    getCount: async (keyword = '') => {
        let sql = `SELECT COUNT(*) as total FROM book_info `;
        const params = [];
        
        if (keyword) {
            sql += `WHERE bookName LIKE ?`;
            params.push(`%${keyword}%`);
        }
        
        const [rows] = await db.query(sql, params);
        return rows[0].total;
    },

    // 根据ID获取图书
    getById: async (bookId) => {
        const sql = `
            SELECT b.*, t.typeName 
            FROM book_info b 
            LEFT JOIN book_type t ON b.bookType = t.id 
            WHERE b.bookId = ?
        `;
        const [rows] = await db.query(sql, [bookId]);
        return rows[0];
    },

    // 新增图书
    create: async (bookData) => {
        const sql = `
            INSERT INTO book_info 
            (bookCode, bookName, bookType, bookAuthor, publishPress, publishDate, borrowed, createdBy, creationTime, lastUpdatetime) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NULL)
        `;
        const params = [
            bookData.bookCode,
            bookData.bookName,
            bookData.bookType,
            bookData.bookAuthor,
            bookData.publishPress,
            bookData.publishDate,
            bookData.borrowed || 0,
            bookData.createdBy || 'admin'
        ];
        const [result] = await db.query(sql, params);
        return result.insertId;
    },

    // 更新图书
    update: async (bookId, bookData) => {
        const sql = `
            UPDATE book_info 
            SET bookCode = ?, bookName = ?, bookType = ?, bookAuthor = ?, 
                publishPress = ?, publishDate = ?, borrowed = ?, lastUpdatetime = NOW()
            WHERE bookId = ?
        `;
        const params = [
            bookData.bookCode,
            bookData.bookName,
            bookData.bookType,
            bookData.bookAuthor,
            bookData.publishPress,
            bookData.publishDate,
            bookData.borrowed,
            bookId
        ];
        const [result] = await db.query(sql, params);
        return result.affectedRows > 0;
    },

    // 删除图书
    delete: async (bookId) => {
        const sql = `DELETE FROM book_info WHERE bookId = ?`;
        const [result] = await db.query(sql, [bookId]);
        return result.affectedRows > 0;
    }
};

module.exports = Book;
