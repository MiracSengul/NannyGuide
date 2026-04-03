import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, set, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBtF-QmyfRHeucypBVYykrUTAUjuoNavHc",
  authDomain: "nanny-app-fecf7.firebaseapp.com",
  databaseURL: "https://nanny-app-fecf7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nanny-app-fecf7",
  storageBucket: "nanny-app-fecf7.firebasestorage.app",
  messagingSenderId: "570283096583",
  appId: "1:570283096583:web:c9d1b82be61d54e355c8a2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

export const nanniesRef = () => ref(database, '/');
export const nannyRef = (id) => ref(database, `${id}`);
export const userFavoritesRef = (userId) => ref(database, `users/${userId}/favorites`);
export const userAppointmentsRef = (userId) => ref(database, `users/${userId}/appointments`);