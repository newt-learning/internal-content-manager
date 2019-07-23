const mongoose = require("mongoose");
const ContentCreator = mongoose.model("contentCreators");
const arrayToObjectById = require("../utils/helpers");

module.exports = app => {
  // POST request to create a content creator
  app.post("/api/content/creator", async (req, res) => {
    const { name, sourceId, url } = req.body;

    const contentCreator = new ContentCreator({
      name,
      url,
      sourceId,
      dateAdded: Date.now(),
      lastUpdated: Date.now()
    });

    try {
      await contentCreator.save();

      res.send(contentCreator);
    } catch (error) {
      res.send(error);
    }
  });

  // GET request to fetch content creators
  app.get("/api/content/creator", (req, res) => {
    ContentCreator.find({}, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        const creatorsById = arrayToObjectById(data);
        res.send(creatorsById);
      }
    });
  });
};
