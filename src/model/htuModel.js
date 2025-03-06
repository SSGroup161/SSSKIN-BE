const pool = require("../config/db");

const getHtuBySeries = async (series) => {
    console.log("model getHtuBySeries");
    try {
        const query =
            "SELECT * FROM htu WHERE id_series_name = ? AND status = 'active' ORDER BY no_rilis ASC";
        const [rows] = await pool.execute(query, [series]);

        if (rows.length === 0) {
            return null;
        }

        return rows;
    } catch (err) {
        console.error("Error in getHtuBySeries:", err);
        throw err;
    }
};

const getHtuByType = async (type) => {
    console.log("model getHtuByType");
    try {
        const query =
            "SELECT * FROM htu WHERE htu_type = ? AND status = 'active'";
        const [rows] = await pool.execute(query, [type]);

        if (rows.length === 0) {
            return null;
        }

        return rows[0];
    } catch (err) {
        console.error("Error in getHtuByType:", err);
        throw err;
    }
};

const getAllHtu = async () => {
    console.log("model getAllHtu");
    try {
        const query = "SELECT * FROM htu WHERE sataus = 'active'";
        const [rows] = await pool.execute(query);

        if (rows.length === 0) {
            return null;
        }

        return rows[0];
    } catch (err) {
        console.error("Error in getAllHtu:", err);
        throw err;
    }
};

module.exports = { getHtuBySeries, getHtuByType, getAllHtu };
