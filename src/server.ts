import initDB from "./db";
import app from "./app";

const port = process.env.PORT || 3000;

const main = async () => {
  try {
    await initDB();

    app.listen(port, () => {
      console.log(`Server Running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

main();
