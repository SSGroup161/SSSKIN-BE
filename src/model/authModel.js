const pool = require("../config/db");

const getLogin = async (data) => {
    const { email } = data;
    console.log("model getLogin");
    try {
        const queryString = "SELECT * FROM users WHERE email = ?";
        const values = [email];

        const [result] = await pool.execute(queryString, values);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const postUsers = async (data) => {
    const { id, username, email, password, role, notelp } = data;
    console.log("model postUsers");
    try {
        const queryString = `INSERT INTO users ( id, username, email, password, role, notelp) VALUES ( ?, ?, ?, ?, ?, ?)`;
        const values = [id, username, email, password, role, notelp];

        const [result] = await pool.execute(queryString, values);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = { getLogin, postUsers };
