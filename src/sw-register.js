// console.log("hi from sw-registe.js");
if ("serviceWorker" in navigator) {
  // console.log("service Worker exists");
  navigator.serviceWorker
    .register("./sw.js")
    .then(() => {
      // console.log("sw.js registered successfully");
    })
    .catch((err) => {
      console.log("couldnt register sw.js : ", err);
    });
}
