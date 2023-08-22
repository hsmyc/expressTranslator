document.getElementById("translateButton").addEventListener("click", translate);

async function translate() {
  const formData = {
    word: document.getElementById("word").value,
  };

  try {
    let [responseNl, responseTr] = await Promise.all([
      fetch("http://localhost:3001/translate/nl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }),
      fetch("http://localhost:3001/translate/tr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }),
    ]);

    let [dataNl, dataTr] = await Promise.all([
      responseNl.text(),
      responseTr.text(),
    ]);

    document.getElementById("response-nl").innerHTML = dataNl;
    document.getElementById("response-tr").innerHTML = dataTr;
  } catch (error) {
    console.error("There was an error!", error);
  }
}
