const mongoose = require("mongoose");
const arrayToObjectById = require("../utils/helpers");

const Content = mongoose.model("newt-content");

module.exports = app => {
  // POST request to create a content item
  app.post("/api/content/item", async (req, res) => {
    const {
      name,
      description,
      url,
      partOfSeries,
      series,
      contentCreator,
      source,
    } = req.body;

    const content = new Content({
      name,
      description,
      url,
      partOfSeries,
      series,
      contentCreator,
      source,
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
