const pool = require("../config/db");

const getSeriesById = async (id) => {
    console.log("model getSeriesById");
    try {
        const query =
            "SELECT * FROM series WHERE id_series_name = ? AND status = 'active'";
        const [rows] = await pool.execute(query, [id]);

        if (rows.length === 0) {
            return null;
        }

        return rows[0];
    } catch (err) {
        console.error("Error in getSeriesById:", err);
        throw err;
    }
};

const getAllSeries = async () => {
    console.log("model getAllSeries");
    try {
        const query =
            "SELECT * FROM series WHERE status = 'active' ORDER BY no_rilis DESC";
        const [rows] = await pool.execute(query);

        if (rows.length === 0) {
            return null;
        }

        return rows;
    } catch (err) {
        console.error("Error in getAllSeries:", err);
        throw err;
    }
};

module.exports = { getSeriesById, getAllSeries };
