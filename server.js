import express from "express";
import fs from "fs";
import translateHandler from "./translate.js";

const NL_TRANSLATION_ENDPOINT =
  "https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=en%7Cnl&mt=1&onlyprivate=0&de=a%40b.c";
const TR_TRANSLATION_ENDPOINT =
  "https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=en%7Ctr&mt=1&onlyprivate=0&de=a%40b.c";

const app = express();
const port = 3001;
app.use(express.json());
const file = JSON.parse(fs.readFileSync("data.json", "utf8"));
console.log(file.users);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.post("/users", (req, res) => {
  file.users.push(req.body);
  fs.writeFile("data.json", JSON.stringify(file), (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Successfully Written to File.");
  });
});
app.get("/users", (req, res) => {
  res.send(file.users);
});
app.post("/translate/nl", translateHandler(NL_TRANSLATION_ENDPOINT));
app.post("/translate/tr", translateHandler(TR_TRANSLATION_ENDPOINT));

app.listen(port, () => {
  console.log("Server is running...");
});
