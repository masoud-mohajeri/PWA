if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then(() => {})
    .catch((err) => {
      console.log("couldnt register sw.js : ", err);
    });
}
