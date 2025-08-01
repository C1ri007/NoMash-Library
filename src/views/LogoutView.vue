<template>
  <h1>Log out</h1>
  <p><button @click="logout">Log out</button></p>
</template>

<script setup>
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = getAuth();

const logout = async () => {
  const user = auth.currentUser;
  if (user) {
    console.log("Current user before logout:", user);
  } else {
    console.log("No user is currently signed in.");
  }
  try {
    await signOut(auth);
    console.log("Logged out successfully");
    router.push("/FireLogin"); // Jump to login page after logout
  } catch (error) {
    console.log(error.code);
  }
};
</script>
