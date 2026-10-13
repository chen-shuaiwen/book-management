const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const bookRoutes = require('./routes/book');

const app = express();
const PORT = process.env.PORT || 3000;

// 视图引擎设置
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 中间件
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// 路由
app.use('/books', bookRoutes);

// 首页重定向到图书列表
app.get('/', (req, res) => {
    res.redirect('/books');
});

// 启动服务器（仅在直接运行时启动，被 require 时不启动，方便测试）
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`服务器运行在 http://localhost:${PORT}`);
    });
}

module.exports = app;
