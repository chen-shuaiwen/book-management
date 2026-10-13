const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// 获取图书类型列表（API）— 必须在 /:id 之前定义，否则 "api" 会被当作 id 参数
router.get('/api/types', bookController.getTypes);

// 图书列表（支持分页和搜索）
router.get('/', bookController.list);

// 新增图书页面
router.get('/add', bookController.addPage);

// 保存新图书
router.post('/', bookController.create);

// 查看图书详情
router.get('/:id', bookController.detail);

// 修改图书页面
router.get('/:id/edit', bookController.editPage);

// 更新图书
router.put('/:id', bookController.update);

// 删除图书
router.delete('/:id', bookController.delete);

module.exports = router;
