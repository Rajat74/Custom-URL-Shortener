const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/urlRoute");
const directRoute = require("./routes/directRoute");

const app = express();
const PORT = 8001;

// Creating a connection to local mongoDB server.
connectToMongoDB("mongodb://localhost:27017/short-url").then(
    console.log("MongoDB connected")
);

app.use(express.json()); // this is a middleware for reading the body.

// Redirecting to the Routes.
app.use("/url", urlRoute);
app.use("/", directRoute);

app.listen(PORT, () => console.log(`Server Started! at PORT ${PORT}`));
