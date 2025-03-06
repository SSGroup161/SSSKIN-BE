const { getAllSeries, getSeriesById } = require("../model/seriesModel");

const xss = require("xss");

const SeriesController = {
    getData: async (req, res, next) => {
        try {
            const dataSeries = await getAllSeries();

            res.status(200).json({
                status: 200,
                message: "Get data series success",
                dataSeries,
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
            const dataSeries = await getSeriesById(idXss);

            if (dataSeries) {
                res.status(200).json({
                    status: 200,
                    message: "Get data series by id success",
                    dataSeries,
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: "Series not found",
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

module.exports = SeriesController;
