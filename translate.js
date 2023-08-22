import fetch from "node-fetch";
import fs from "fs";

const translateHandler = (endpoint) => async (req, res) => {
  const { word } = req.body;
  try {
    const response = await fetch(`${endpoint}&q=${word}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "4bd3494556msh1eacdfd3d8d0798p1ac640jsn3a5710098fed",
        "X-RapidAPI-Host":
          "translated-mymemory---translation-memory.p.rapidapi.com",
      },
    });

    const result = await response.json();
    const translatedText = result.responseData.translatedText;
    res.send(translatedText);

    const filePath = endpoint.includes("en%7Cnl")
      ? "translate/nl.json"
      : "translate/tr.json";
    const data = fs.readFileSync(filePath);
    const translations = JSON.parse(data);
    translations[word] = translatedText;
    fs.writeFileSync(filePath, JSON.stringify(translations));

    console.log(`Successfully wrote ${translatedText} to ${filePath}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error translating word");
  }
};

export default translateHandler;
