console.log("sw v = 8");

self.addEventListener("install", (event) => {
  // console.log("install event : ", event);
});

self.addEventListener("notificationclick", (event) => {
  const notification = event.notification;
  const action = event.action;
  if (action === "git") {
    notification.close();
    event.waitUntil(
      clients.matchAll().then((clis) => {
        const client = clis.find((c) => c.visibilityState === "visible");
        if (client !== undefined) {
          console.log("here");
          client.navigate("https://material.angular.io/");
          // clients.focus();
        } else {
          clients.openWindow("https://material.angular.io/");
        }
        notification.close();
      })
    );
  } else if (action === "pwa") {
    event.waitUntil(
      clients.matchAll().then((clis) => {
        const client = clis.find((c) => c.visibilityState === "visible");
        if (client !== undefined) {
          client.navigate("https://www.google.com/");
          // client.focus();
        } else {
          clients.openWindow("https://www.google.com/");
        }
        notification.close();
      })
    );
  }
});

self.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  let promptEvent = event;
  console.log("[sw] beforeinstallprompt : ", promptEvent);
});
