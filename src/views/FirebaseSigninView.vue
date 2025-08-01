<template>
  <h1>Sign in</h1>
  <p style="color: #007bff; font-weight: bold;">You can sign in by multiple roles in the system (e.g. admin, librarian, user)</p>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
   .then((data) => {
      console.log("Firebase Login Successful!");
      router.push("/");
      console.log(auth.currentUser);
    })
   .catch((error) => {
      console.log(error.code);
    });
};
</script>