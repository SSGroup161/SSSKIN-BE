const {
    getAllProduct,
    getProductById,
    getProductBySeries,
} = require("../model/productModel");

const xss = require("xss");

const ProductController = {
    getData: async (req, res, next) => {
        try {
            const dataUsers = await getAllProduct();

            res.status(200).json({
                status: 200,
                message: "Get data product success",
                dataUsers,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 500,
                message: "Internal server error",
            });
        }
    },

    getDataById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const idXss = xss(id);
            const dataUsers = await getProductById(idXss);

            if (dataUsers) {
                res.status(200).json({
                    status: 200,
                    message: "Get data product by id success",
                    dataUsers,
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: "Product not found",
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 500,
                message: "Internal server error",
            });
        }
    },

    getDataBySeries: async (req, res, next) => {
        try {
            const { series } = req.params;
            const idXss = xss(series);
            const dataProduct = await getProductBySeries(idXss);

            if (dataProduct) {
                res.status(200).json({
                    status: 200,
                    message: "Get data product by series success",
                    dataProduct,
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: "Product not found",
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 500,
                message: "Internal server error",
            });
        }
    },
};

module.exports = ProductController;
