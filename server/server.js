import app from "./app/app.js";

app.listen(process.env.SERVER, () => {
  console.log(`server has started on port ${process.env.SERVER}`);
});
