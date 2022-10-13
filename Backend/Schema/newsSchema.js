require("../databaseConnection")
const mongoose = require("mongoose")
const newsSchema = new mongoose.Schema({
    link: String,
    title: String,
    image: String,
    description: String
});

const News = mongoose.model("News", newsSchema);

module.exports = News;

