import firebase from 'firebase'
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBk9Ps0ZAlweKyap5t02dGUSjC3RrqT6lw",
  authDomain: "chat-app-test-34f2c.firebaseapp.com",
  projectId: "chat-app-test-34f2c",
  storageBucket: "chat-app-test-34f2c.appspot.com",
  messagingSenderId: "616329648732",
  appId: "1:616329648732:web:e9398990dc9a2235dc2499"
};

// Initialize Firebase
// let app
// !firebase.apps.length ? app = firebase.initializeApp(firebaseConfig) :app= firebase.app();
// let app;
// if (firebase.apps.length === 0) {
// app = firebase.initializeApp(firebaseConfig);
// } else {
// app = firebase.app();
// }
// const db = app.firestore();
// const auth = firebase.auth();
// export { db, auth,firebase };

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
export default firebase;




