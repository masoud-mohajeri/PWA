importScripts("ngsw-worker.js");
console.log("sw v = 9");
const syncList = [];

self.addEventListener("install", (event) => {
  console.log("install event : ", event);
  // self.skipWaiting();
});

self.addEventListener("notificationclick", (event) => {
  const notification = event.notification;
  const action = event.action;
  if (action === "git") {
    event.waitUntil(
      clients.matchAll().then(() => {
        clients.openWindow("https://material.angular.io/");
        notification.close();
      })
    );
  } else if (action === "pwa") {
    event.waitUntil(
      clients.matchAll().then(() => {
        clients.openWindow("https://www.google.com/");
        notification.close();
      })
    );
  }
});

// self.addEventListener("message", (event) => {
//   console.log(event);
//   if (event.data.type === "syncInput") {
//     syncList.push(event.data.Input);
//   }
// });

// function postData(data) {
//   fetch("https://masoud-pwa-default-rtdb.firebaseio.com/", {
//     method: "POST",
//     mode: "cors",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((res) => {
//       if (res.ok) {
//         syncList.filter((sd) => sd.date !== data.date);
//       }
//     })
//     .catch((err) => {
//       console.log("fetch error (turn on your vpn) : ", err);
//     });
// }

//data : { [time: string]: Date , [signuture: string]: string }

// self.addEventListener('sync',event=>{
//   console.log('[sw] background sync : ' , event)

// })
