const mongoose = require("mongoose");
const Content = mongoose.model("content");
const arrayToObjectById = require("../utils/helpers");

module.exports = app => {
  // POST request to create a content item
  app.post("/api/content/item", async (req, res) => {
    const {
      name,
      url,
      partOfSeries,
      contentSeries,
      contentCreator,
      source,
      knowledgeSubject,
      knowledgeModule,
      level,
      primaryTopics,
      secondaryTopics
    } = req.body;

    const content = new Content({
      name,
      url,
      partOfSeries,
      contentSeries,
      contentCreator,
      source,
      knowledgeSubject,
      knowledgeModule,
      level,
      primaryTopics,
      secondaryTopics,
      dateAdded: Date.now(),
      lastUpdated: Date.now()
    });

    try {
      await content.save();

      res.send(content);
    } catch (error) {
      res.send(error);
    }
  });

  // GET request to fetch content items
  app.get("/api/content/item/by-id", (req, res) => {
    Content.find({}, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        const contentById = arrayToObjectById(data);
        res.send(contentById);
      }
    });
  });

  // PUT request o update a content item
  app.put(`/api/content/:contentId/update`, (req, res) => {
    const { contentId } = req.params;
    const data = req.body;

    Content.findByIdAndUpdate(
      contentId,
      data,
      { new: true },
      (error, content) => {
        if (error) {
          res.send(error);
        } else {
          res.send(content);
        }
      }
    );
  });
};
