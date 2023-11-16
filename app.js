const express = require("express");

const app = express();
const port = 3000;

const userRouter = require("./routes/userRouter");

app.use(express.json());

app.use(express.static("public"));

app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http:localhost:${port}`);
});
