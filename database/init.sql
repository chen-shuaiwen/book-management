-- 图书借阅系统数据库初始化脚本

-- 创建数据库
CREATE DATABASE IF NOT EXISTS book_management DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE book_management;

-- 图书类型表
CREATE TABLE IF NOT EXISTS book_type (
    id INT PRIMARY KEY AUTO_INCREMENT,
    typeName VARCHAR(50) NOT NULL COMMENT '图书类型名称'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='图书类型表';

-- 图书信息表
CREATE TABLE IF NOT EXISTS book_info (
    bookId INT PRIMARY KEY AUTO_INCREMENT,
    bookCode VARCHAR(50) NOT NULL COMMENT '图书编号',
    bookName VARCHAR(100) NOT NULL COMMENT '图书名称',
    bookType INT NOT NULL COMMENT '图书类型ID',
    bookAuthor VARCHAR(50) NOT NULL COMMENT '图书作者',
    publishPress VARCHAR(100) NOT NULL COMMENT '出版社',
    publishDate DATE NOT NULL COMMENT '出版日期',
    borrowed INT NOT NULL DEFAULT 0 COMMENT '是否借阅: 1=已借阅, 0=未借阅',
    createdBy VARCHAR(50) NOT NULL COMMENT '创建人',
    creationTime DATETIME NOT NULL COMMENT '创建时间',
    lastUpdatetime DATETIME COMMENT '最后更新时间',
    FOREIGN KEY (bookType) REFERENCES book_type(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='图书信息表';

-- 插入图书类型初始数据
INSERT INTO book_type (typeName) VALUES 
('小说'), ('文学'), ('传记'), ('艺术'), 
('少儿'), ('经济'), ('管理'), ('科技');

-- 插入测试数据（至少5条）
INSERT INTO book_info (bookCode, bookName, bookType, bookAuthor, publishPress, publishDate, borrowed, createdBy, creationTime, lastUpdatetime) VALUES
('BK001', '红楼梦', 1, '曹雪芹', '人民文学出版社', '2008-07-01', 0, 'admin', '2024-01-15 10:00:00', NULL),
('BK002', '百年孤独', 1, '加西亚·马尔克斯', '南海出版公司', '2011-06-01', 1, 'admin', '2024-01-16 11:00:00', '2024-02-01 09:00:00'),
('BK003', '人类简史', 8, '尤瓦尔·赫拉利', '中信出版社', '2014-11-01', 0, 'admin', '2024-01-17 14:00:00', NULL),
('BK004', '活着', 2, '余华', '作家出版社', '2012-08-01', 0, 'admin', '2024-01-18 09:30:00', NULL),
('BK005', '史蒂夫·乔布斯传', 3, '沃尔特·艾萨克森', '中信出版社', '2011-10-01', 1, 'admin', '2024-01-19 16:00:00', '2024-02-15 10:00:00'),
('BK006', '艺术的故事', 4, '贡布里希', '广西美术出版社', '2008-04-01', 0, 'admin', '2024-01-20 10:30:00', NULL),
('BK007', '小王子', 5, '安托万·德·圣埃克苏佩里', '人民文学出版社', '2003-01-01', 0, 'admin', '2024-01-21 11:00:00', NULL),
('BK008', '国富论', 6, '亚当·斯密', '商务印书馆', '2015-03-01', 0, 'admin', '2024-01-22 13:00:00', NULL);
