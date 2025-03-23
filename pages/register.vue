<script setup>
import { ref } from "vue";
import { useRuntimeConfig } from "#imports";
import Swal from "sweetalert2";
import axios from "axios";

definePageMeta({
  layout: "auth",
});

const config = useRuntimeConfig();

const name = ref("");
const email = ref("");
const occupation = ref("");
const password = ref("");

const userRegister = async () => {
  try {
    const response = await axios.post(`${config.public.apiBase}/api/v1/users`, {
      name: name.value,
      email: email.value,
      occupation: occupation.value,
      password: password.value,
    });

    const token = response.data?.data?.token;

    if (token) {
      localStorage.setItem("auth_token", token);
      console.log("berhasil store token ", token);

      Swal.fire({
        icon: "success",
        title: "Register Successful!",
        text: "Welcome!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      navigateTo("/upload");
    } else {
      throw new Error("Invalid Register response. Token not found.");
    }
  } catch (error) {
    console.error("Register Error:", error);

    let errorMessage =
      error?.response?.data?.errors ||
      "Register failed. Please check your credentials and try again.";

    Swal.fire({
      icon: "error",
      title: "Register Failed",
      text: errorMessage,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }
};
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div
      class="hidden md:block lg:w-1/3 bg-white h-full auth-background rounded-tr-lg rounded-br-lg"
    ></div>
    <div class="w-auto md:w-2/4 lg:w-2/3 flex justify-center items-center">
      <div class="w-full lg:w-1/2 px-10 lg:px-0">
        <h2 class="font-normal mb-6 text-3xl text-white">Sign Up Account</h2>

        <!-- Alert Error -->
        <div
          v-if="alertMessage"
          class="mb-4 p-3 bg-red-500 text-white rounded-lg"
        >
          {{ alertMessage }}
        </div>

        <div class="mb-6">
          <div class="mb-4">
            <label class="font-normal text-lg text-white block mb-3"
              >Full Name</label
            >
            <input
              v-model="name"
              type="text"
              class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
              placeholder="Write Your Name Here"
            />
          </div>
        </div>
        <div class="mb-6">
          <div class="mb-4">
            <label class="font-normal text-lg text-white block mb-3"
              >Occupation</label
            >
            <input
              v-model="occupation"
              type="text"
              class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
              placeholder="Write your occupation here"
            />
          </div>
        </div>
        <div class="mb-6">
          <div class="mb-4">
            <label class="font-normal text-lg text-white block mb-3"
              >Email Address</label
            >
            <input
              v-model="email"
              type="email"
              class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
              placeholder="Write your email address here"
            />
          </div>
        </div>
        <div class="mb-6">
          <div class="mb-4">
            <label class="font-normal text-lg text-white block mb-3"
              >Password</label
            >
            <input
              @keyup.enter="userRegister"
              v-model="password"
              type="password"
              class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
              placeholder="Type your password here"
            />
          </div>
        </div>
        <div class="mb-6">
          <div class="mb-4">
            <button
              @click="userRegister"
              class="block w-full bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-4 text-lg rounded-full"
            >
              Continue Sign Up
            </button>
          </div>
        </div>
        <div class="text-center">
          <p class="text-white text-md">
            Already have account?
            <NuxtLink href="/login" class="no-underline text-orange-button">
              Sign In
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-background {
  background-image: url("/sign-up-background.jpg");
  background-position: center;
  background-size: cover;
}
</style>
