const pool = require("../config/db");

const getArticleByIdTitle = async (id) => {
    console.log("model getArticleById");
    try {
        const query = "SELECT * FROM article WHERE id_title = ?";
        const [rows] = await pool.execute(query, [id]);

        if (rows.length === 0) {
            return null;
        }

        return rows[0];
    } catch (err) {
        console.error("Error in getArticleById:", err);
        throw err;
    }
};

const getArticleById = async (id) => {
    console.log("model getArticleById");
    try {
        const query = "SELECT * FROM article WHERE id = ?";
        const [rows] = await pool.execute(query, [id]);

        if (rows.length === 0) {
            return null;
        }

        return rows[0];
    } catch (err) {
        console.error("Error in getArticleById:", err);
        throw err;
    }
};

const getArticle = async () => {
    console.log("model getArticle");
    try {
        const [result] = await pool.execute(
            `SELECT * FROM article ORDER BY created_at DESC`
        );
        return result;
    } catch (err) {
        throw err;
    }
};

const getArticlesByStatus = async (status) => {
    console.log(`model getArticlesByStatus for status: ${status}`);
    try {
        const query = `
            SELECT * 
            FROM article 
            WHERE status = ?
            ORDER BY 
                CASE 
                    WHEN status = 'pending' THEN created_at
                    ELSE NULL
                END ASC,
                CASE 
                    WHEN status = 'posted' THEN posting_at
                    WHEN status = 'deleted' THEN created_at
                    ELSE NULL
                END DESC
        `;

        const [result] = await pool.execute(query, [status]);
        return result;
    } catch (err) {
        throw err;
    }
};

const postArticle = async (data) => {
    const {
        id,
        id_title,
        title,
        creator,
        day,
        date,
        link_img,
        public_id,
        caption_img,
        description,
        place,
        status,
        updated_at,
        deleted_at,
    } = data;
    console.log("model postArticle");
    try {
        const queryString =
            "INSERT INTO article (id, id_title, title, creator, day, date, link_img, public_id, caption_img, description, place, status, updated_at, deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [
            id,
            id_title,
            title,
            creator,
            day,
            date,
            link_img,
            public_id,
            caption_img,
            description,
            place,
            status,
            updated_at,
            deleted_at,
        ];

        const [rows] = await pool.execute(queryString, values);
        return rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const deleteById = async (id) => {
    console.log("delete article by id ->", id);
    try {
        const [result] = await pool.execute(
            `DELETE FROM article WHERE id_title = ?`,
            [id]
        );
        return result;
    } catch (err) {
        console.error("Error in deleteById:", err);
        throw err;
    }
};

const postingArticle = async (data, id) => {
    const { day, date, posting_at } = data;
    console.log("posting article by id", id);
    try {
        const queryString =
            "UPDATE article SET status = 'posted', day = ?, date = ?, posting_at = ? WHERE id_title = ?";
        const values = [day, date, posting_at, id];

        const [result] = await pool.execute(queryString, values);

        if (result.affectedRows === 0) {
            throw new Error(`Artikel dengan ID ${id} tidak ditemukan.`);
        }
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const softDelete = async (date, id) => {
    console.log("softDelete article by id & date->", id, date);
    try {
        const queryString =
            "UPDATE article SET status= 'deleted', deleted_at= ? WHERE id_title = ?";
        const values = [date, id];

        const [result] = await pool.execute(queryString, values);

        if (result.affectedRows === 0) {
            throw new Error(`Artikel dengan ID ${id} tidak ditemukan.`);
        }
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const putArticle = async (data, id) => {
    const {
        id_title,
        title,
        creator,
        day,
        date,
        link_img,
        caption_img,
        description,
        place,
        public_id,
        updated_at,
        deleted_at,
    } = data;

    console.log("model putArticle");
    console.log(data);

    try {
        const queryString = `
            UPDATE article
            SET id_title = ?, title = ?, creator = ?, day = ?, date = ?, link_img = ?, caption_img = ?, description = ?, place = ?, public_id = ?, updated_at = ?, deleted_at = ?
            WHERE id = ?`;
        const values = [
            id_title,
            title,
            creator,
            day,
            date,
            link_img,
            caption_img,
            description,
            place,
            public_id,
            updated_at,
            deleted_at,
            id,
        ];

        const [result] = await pool.execute(queryString, values);

        if (result.affectedRows === 0) {
            throw new Error(`Artikel dengan ID ${id} tidak ditemukan.`);
        }
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = {
    getArticleById,
    getArticleByIdTitle,
    getArticle,
    getArticlesByStatus,
    postArticle,
    postingArticle,
    deleteById,
    putArticle,
    softDelete,
};
