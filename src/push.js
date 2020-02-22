import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyAryXOWFNp_2vSBIvjh9EpAYkhx2wPDtXA",
  authDomain: "peaks-app.firebaseapp.com",
  databaseURL: "https://peaks-app.firebaseio.com",
  projectId: "peaks-app",
  storageBucket: "peaks-app.appspot.com",
  messagingSenderId: "1074975866849",
  appId: "1:1074975866849:web:29d70476c6af60f2e51ca0"
}

export const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig)

  navigator.serviceWorker
    .register('/my-sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
    });
}

export const askUserPermission = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token', token);

    return token
    
  } catch(err) {
    console.error()
  }
}




// const messaging = firebase.messaging();
// messaging.usePublicVapidKey('BDSQT4DGM_PfuUmEovp2Yr9zu9k1otdIXdxHeMfFHhiZ5wdEqkFadC1JiQPXUsTmj-8PdItpipwFil4AnIwewVA')


//const isPushNotificationsSupported = () => "serviceWorker" in navigator && 'PushManager' in window;

// //function registerServiceWorker() {
//   return navigator.serviceWorker.register('/sw.js')
// }

// async function askUserPermission() {
//   return await Notification.requestPermission()
// }
