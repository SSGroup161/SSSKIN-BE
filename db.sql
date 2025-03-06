select * from product WHERE id_series_name="icy-series";

SELECT * FROM product WHERE id_product_name = 'oceanic-lip-protection-treatment' AND status = 'active';

ALTER TABLE article
MODIFY COLUMN description TEXT;

INSERT INTO article (id, id_title, title, creator, day, date, link_img, public_id, caption_img, description, place, status, created_at, updated_at, deleted_at) VALUES
('1', 'the-rise-of-ai', 'The Rise of AI', 'John Doe', 'Monday', '2024-06-01', 'https://res.cloudinary.com/dixxtnquz/image/upload/v1703846013/SSG/sskinbgfix_h2nabn.png', 'ai-001', 'AI Image', 'An in-depth look at the rise of artificial intelligence in modern society.', 'New York', 'pending', '2024-06-01 10:00:00', NULL, NULL),
('2', 'climate-change-effects', 'Climate Change Effects', 'Jane Smith', 'Wednesday', '2024-06-02', 'https://res.cloudinary.com/dixxtnquz/image/upload/v1703833379/SSG/bglevelupb_juz5hg.png', 'climate-002', 'Climate Image', 'Exploring the effects of climate change on our environment and daily lives.', 'San Francisco', 'pending', '2024-06-02 12:00:00', NULL, NULL),
('3', 'advancements-in-biotechnology', 'Advancements in Biotechnology', 'Alice Johnson', 'Friday', '2024-06-03', 'https://res.cloudinary.com/dixxtnquz/image/upload/v1704338307/SSG/levelup-589_1_lah4jd.svg', 'bio-003', 'Biotech Image', 'Latest advancements in biotechnology and their potential impact on healthcare.', 'Boston', 'pending', '2024-06-03 14:00:00', NULL, NULL);


DROP TABLE article;

CREATE TABLE article (
    id VARCHAR(255) PRIMARY KEY,
    id_title VARCHAR(255),
    title VARCHAR(255),
    creator VARCHAR(255),
    day VARCHAR(255),
    date VARCHAR(255),
    link_img VARCHAR(255),
    public_id VARCHAR(255),
    caption_img VARCHAR(255),
    description VARCHAR(100000),
    place VARCHAR(255),
    status VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at VARCHAR(255),
    deleted_at VARCHAR(255)
);

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255),
    notelp INT(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);