import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBom_x0HvDPmuSAgSi80I2mktjK2J9NCa4",
  authDomain: "admin-416dc.firebaseapp.com",
  projectId: "admin-416dc",
  storageBucket: "admin-416dc.appspot.com",
  messagingSenderId: "233328639256",
  appId: "1:233328639256:web:2d4938c1d220c7fb93326d",
  measurementId: "G-55VMZYL14R"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
