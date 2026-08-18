import initDB from "./db";
import app from "./app";
import config from "./config";

const main = async () => {
  try {
    await initDB();

    app.listen(config.port, () => {
      console.log(`Server Running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

main();
