import dbConnection from "./dbConnection";
import app from "./app";

app.listen(process.env.SERVER, () => {
  console.log(`server has started on port ${process.env.SERVER}`);
});
