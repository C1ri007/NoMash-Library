import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')


// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCCiTA5cn9N1OJ3OcSpmyJWuPSjdv-vOD0",
//   authDomain: "week7-chenkai.firebaseapp.com",
//   projectId: "week7-chenkai",
//   storageBucket: "week7-chenkai.firebasestorage.app",
//   messagingSenderId: "1033138792723",
//   appId: "1:1033138792723:web:5f2ca0373ee5a0198552e6"
// };

// // Initialize Firebase
// initializeApp(firebaseConfig);
