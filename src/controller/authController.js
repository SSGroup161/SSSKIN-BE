const { getLogin, postUsers } = require("../model/authModel");
const { hash, verify } = require("../helper/passwordHash");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const xss = require("xss");

const secretKey = process.env.SECRET_KEY;

const AuthController = {
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    status: 400,
                    message: "input email and password required",
                });
            }

            const dataUsers = await getLogin({ email });

            if (dataUsers && dataUsers.length > 0) {
                const storedPassword = dataUsers[0].password;

                if (
                    typeof storedPassword === "string" &&
                    typeof password === "string"
                ) {
                    const isPasswordValid = await verify(
                        storedPassword,
                        password
                    );
                    if (isPasswordValid) {
                        const token = jwt.sign(
                            {
                                email: email,
                                users_Id: dataUsers[0].id,
                                role: dataUsers[0].role,
                                username: dataUsers[0].username,
                                notelp: dataUsers[0].notelp,
                            },
                            secretKey,
                            { expiresIn: "24h" }
                        );
                        return res.status(200).json({
                            status: 200,
                            message: "Login Successfully",
                            token,
                            data: dataUsers[0],
                        });
                    } else {
                        return res
                            .status(401)
                            .json({ status: 401, message: "Wrong password" });
                    }
                } else {
                    return res.status(500).json({
                        status: 500,
                        message:
                            "Internal server error: Invalid password format",
                    });
                }
            } else {
                return res.status(404).json({
                    status: 404,
                    message: "Email not found",
                });
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).json({
                status: 500,
                message: "Internal server error",
            });
        }
    },

    postData: async (req, res, next) => {
        try {
            const { username, email, password, role, notelp } = req.body;
            const uuid = uuidv4();

            console.log("post data");
            console.log(username, email, password, role, notelp);

            if (!username || !email || !password || !role || !notelp) {
                return res.status(400).json({
                    status: 400,
                    message:
                        "input username, email, password, role, notelp required",
                });
            }

            const hashedPassword = await hash(password);

            console.log("data");
            const data = {
                id: uuid,
                username: xss(username),
                email: xss(email),
                password: xss(hashedPassword),
                role: xss(role),
                notelp: xss(notelp),
            };

            console.log(data);
            const result = await postUsers(data);
            console.log(result);

            res.status(200).json({
                status: 200,
                say: `Hello ${username}!`,
                message: "Registration success",
                data,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 500,
                message: "Internal server error",
            });
        }
    },
};

module.exports = AuthController;
