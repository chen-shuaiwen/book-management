# 图书借阅系统后台管理

基于 Express 全栈开发的图书借阅系统后台管理项目。

## 技术栈

- **后端**: Express.js
- **模板引擎**: EJS
- **数据库**: MySQL
- **前端**: HTML/CSS/JavaScript + jQuery

## 功能模块

1. **图书列表展示** - 分页显示、隔行变色、按入库时间降序排列
2. **查询图书** - 根据图书名称模糊查询，支持条件记忆
3. **查看详情** - 展示图书完整信息（只读）
4. **新增图书** - 表单验证、默认值设置
5. **修改图书** - 部分字段只读、表单验证
6. **删除图书** - 确认提示、操作反馈

## 项目结构

```
├── config/            # 配置文件
│   └── database.js    # 数据库连接配置
├── controllers/       # 控制器
│   └── bookController.js
├── database/          # 数据库脚本
│   └── init.sql       # 初始化SQL
├── models/            # 数据模型
│   ├── Book.js
│   └── BookType.js
├── public/            # 静态资源
│   ├── css/
│   └── js/
├── routes/            # 路由
│   └── book.js
├── views/             # 视图模板
│   ├── index.ejs
│   ├── detail.ejs
│   ├── add.ejs
│   └── edit.ejs
├── app.js             # 应用入口
└── package.json
```

## 安装与运行

### 1. 安装依赖

```bash
npm install
```

### 2. 配置数据库

编辑 `config/database.js` 或设置环境变量：

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=book_management
```

### 3. 初始化数据库

```bash
mysql -u root -p < database/init.sql
```

### 4. 启动服务

```bash
npm start
# 或开发模式
npm run dev
```

访问 http://localhost:3000

## 数据库设计

### book_info 图书信息表

| 字段 | 类型 | 说明 |
|------|------|------|
| bookId | INT | 主键，自增 |
| bookCode | VARCHAR(50) | 图书编号 |
| bookName | VARCHAR(100) | 图书名称 |
| bookType | INT | 图书类型ID |
| bookAuthor | VARCHAR(50) | 作者 |
| publishPress | VARCHAR(100) | 出版社 |
| publishDate | DATE | 出版日期 |
| borrowed | INT | 是否借阅(0/1) |
| createdBy | VARCHAR(50) | 创建人 |
| creationTime | DATETIME | 创建时间 |
| lastUpdatetime | DATETIME | 更新时间 |

### book_type 图书类型表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT | 主键，自增 |
| typeName | VARCHAR(50) | 类型名称 |

## 开发流程

1. 创建功能分支
2. 开发完成后提交 PR
3. 通过 GitHub Actions 测试后合并

## License

MIT
