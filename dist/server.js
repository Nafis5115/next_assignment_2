import express, {} from "express";
const app = express();
const port = process.env.PORT || 3000;
app.get("/", (req, res) => { });
app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
});
