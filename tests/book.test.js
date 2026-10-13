const request = require('supertest');
const app = require('../app');

describe('图书管理系统 API 测试', () => {
    
    describe('GET /books', () => {
        it('应该返回图书列表页面', async () => {
            const res = await request(app)
                .get('/books')
                .expect(200);
            
            expect(res.text).toContain('图书借阅系统后台管理');
        });

        it('应该支持分页参数', async () => {
            const res = await request(app)
                .get('/books?page=1')
                .expect(200);
            
            expect(res.text).toContain('图书借阅系统后台管理');
        });

        it('应该支持搜索参数', async () => {
            const res = await request(app)
                .get('/books?keyword=红楼梦')
                .expect(200);
            
            expect(res.text).toContain('图书借阅系统后台管理');
        });
    });

    describe('GET /books/add', () => {
        it('应该返回新增图书页面', async () => {
            const res = await request(app)
                .get('/books/add')
                .expect(200);
            
            expect(res.text).toContain('新增图书');
        });
    });

    describe('GET /', () => {
        it('应该重定向到图书列表', async () => {
            const res = await request(app)
                .get('/')
                .expect(302);
            
            expect(res.headers.location).toBe('/books');
        });
    });
});
