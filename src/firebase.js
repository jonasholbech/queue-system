import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBmdgEAdyIYCNeu1fwrqaej_r2jB9KYMzE",

  authDomain: "mmdqueue.firebaseapp.com",

  databaseURL:
    "https://mmdqueue-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "mmdqueue",

  storageBucket: "mmdqueue.appspot.com",

  messagingSenderId: "841561456533",

  appId: "1:841561456533:web:bd2cd2ea95c875c0e5c09c",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
export { db };
//const db = getFirestore(firebaseApp);

//export { db };
