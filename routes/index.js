module.exports = app => {
  Object.assign(
    {},
    require("./contentCreatorRoutes")(app),
    require("./contentSeriesRoutes")(app),
    require("./contentRoutes")(app),
    require("./sourceRoutes")(app),
  );
};
