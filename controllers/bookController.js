const Book = require('../models/Book');
const BookType = require('../models/BookType');

const bookController = {
    // 图书列表
    list: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const keyword = req.query.keyword || '';
            const pageSize = 5;

            const [books, total, bookTypes] = await Promise.all([
                Book.getList(page, keyword, pageSize),
                Book.getCount(keyword),
                BookType.getAll()
            ]);

            const totalPages = Math.ceil(total / pageSize);

            res.render('index', {
                books,
                keyword,
                currentPage: page,
                totalPages,
                total,
                message: req.query.message
            });
        } catch (error) {
            console.error('获取图书列表失败:', error);
            res.render('index', {
                books: [],
                keyword: '',
                currentPage: 1,
                totalPages: 0,
                total: 0,
                message: '获取图书列表失败'
            });
        }
    },

    // 新增图书页面
    addPage: async (req, res) => {
        try {
            const bookTypes = await BookType.getAll();
            res.render('add', { bookTypes, error: null });
        } catch (error) {
            console.error('获取图书类型失败:', error);
            res.render('add', { bookTypes: [], error: '获取图书类型失败' });
        }
    },

    // 保存新图书
    create: async (req, res) => {
        try {
            const bookId = await Book.create(req.body);
            res.redirect(`/books?message=${encodeURIComponent('添加成功')}`);
        } catch (error) {
            console.error('添加图书失败:', error);
            const bookTypes = await BookType.getAll();
            res.render('add', { 
                bookTypes, 
                error: '添加失败，请检查输入',
                book: req.body 
            });
        }
    },

    // 查看图书详情
    detail: async (req, res) => {
        try {
            const book = await Book.getById(req.params.id);
            if (!book) {
                return res.redirect(`/books?message=${encodeURIComponent('图书不存在')}`);
            }
            res.render('detail', { book });
        } catch (error) {
            console.error('获取图书详情失败:', error);
            res.redirect(`/books?message=${encodeURIComponent('获取详情失败')}`);
        }
    },

    // 修改图书页面
    editPage: async (req, res) => {
        try {
            const [book, bookTypes] = await Promise.all([
                Book.getById(req.params.id),
                BookType.getAll()
            ]);
            
            if (!book) {
                return res.redirect(`/books?message=${encodeURIComponent('图书不存在')}`);
            }
            
            res.render('edit', { book, bookTypes, error: null });
        } catch (error) {
            console.error('获取图书信息失败:', error);
            res.redirect(`/books?message=${encodeURIComponent('获取信息失败')}`);
        }
    },

    // 更新图书
    update: async (req, res) => {
        try {
            const success = await Book.update(req.params.id, req.body);
            if (success) {
                res.redirect(`/books?message=${encodeURIComponent('修改成功')}`);
            } else {
                res.redirect(`/books/${req.params.id}/edit?error=${encodeURIComponent('修改失败')}`);
            }
        } catch (error) {
            console.error('更新图书失败:', error);
            res.redirect(`/books/${req.params.id}/edit?error=${encodeURIComponent('修改失败')}`);
        }
    },

    // 删除图书
    delete: async (req, res) => {
        try {
            const success = await Book.delete(req.params.id);
            const message = success ? '删除成功' : '删除失败';
            res.redirect(`/books?message=${encodeURIComponent(message)}`);
        } catch (error) {
            console.error('删除图书失败:', error);
            res.redirect(`/books?message=${encodeURIComponent('删除失败')}`);
        }
    },

    // 获取图书类型列表（API）
    getTypes: async (req, res) => {
        try {
            const bookTypes = await BookType.getAll();
            res.json(bookTypes);
        } catch (error) {
            console.error('获取图书类型失败:', error);
            res.status(500).json({ error: '获取图书类型失败' });
        }
    }
};

module.exports = bookController;
