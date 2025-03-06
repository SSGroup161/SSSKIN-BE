const pool = require("../config/db");

const getProductById = async (id) => {
    try {
        const query =
            "SELECT * FROM product WHERE id_product_name = ? AND status = 'active'";
        const [rows] = await pool.execute(query, [id]);

        if (rows.length === 0) {
            return null;
        }

        return rows[0];
    } catch (err) {
        console.error("Error in getProductById:", err);
        throw err;
    }
};

const getProductBySeries = async (series) => {
    console.log("model getProductBySeries");
    try {
        const query =
            "SELECT * FROM product WHERE id_series_name = ? AND status = 'active'";
        const [rows] = await pool.execute(query, [series]);

        if (rows.length === 0) {
            return null;
        }

        return rows;
    } catch (err) {
        console.error("Error in getProductBySeries:", err);
        throw err;
    }
};

const getAllProduct = async () => {
    console.log("model getAllProduct");
    try {
        const query = "SELECT * FROM product WHERE status = 'active'";
        const [rows] = await pool.execute(query);

        if (rows.length === 0) {
            return null;
        }

        return rows;
    } catch (err) {
        console.error("Error in getAllProduct:", err);
        throw err;
    }
};

module.exports = { getProductById, getAllProduct, getProductBySeries };
