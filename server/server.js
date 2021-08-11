import app from "./app.js";

app.listen(process.env.SERVER, () => {
  console.log(`server has started on port ${process.env.SERVER}`);
});
