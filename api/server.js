const { app, boot } = require("./app");

const PORT = process.env.PORT || 5000;

boot()
  .then(() => {
    app.listen(PORT, () => console.log(`API running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });