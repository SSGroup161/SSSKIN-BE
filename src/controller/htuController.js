const { getAllHtu, getHtuBySeries } = require("../model/htuModel");

const xss = require("xss");

const SeriesController = {
    getData: async (req, res, next) => {
        try {
            const dataSeries = await getAllHtu();

            res.status(200).json({
                status: 200,
                message: "Get data htu success",
                data: dataSeries,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 500,
                message: "Internal server error",
            });
        }
    },

    getDataSpecify: async (req, res, next) => {
        try {
            const { series } = req.params;
            const seriesXss = xss(series);
            const dataSeries = await getHtuBySeries(seriesXss);

            if (dataSeries) {
                const groupedData = dataSeries.reduce(
                    (acc, item) => {
                        if (item.htu_type === "pagi") {
                            acc.pagi.push(item);
                        } else if (item.htu_type === "malam") {
                            acc.malam.push(item);
                        }
                        return acc;
                    },
                    { pagi: [], malam: [] }
                );

                res.status(200).json({
                    status: 200,
                    message: "Get data htu by series success",
                    data: groupedData,
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: "htu not found",
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
