import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyBtF-QmyfRHeucypBVYykrUTAUjuoNavHc",
  authDomain: "nanny-app-fecf7.firebaseapp.com",
  databaseURL: "https://nanny-app-fecf7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nanny-app-fecf7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);