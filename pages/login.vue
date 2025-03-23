<template>
  <div class="h-screen flex justify-center items-center">
    <div
      class="hidden md:block lg:w-1/3 bg-white h-full auth-background rounded-tr-lg rounded-br-lg"
    ></div>
    <div class="w-auto md:w-2/4 lg:w-2/3 flex justify-center items-center">
      <div class="w-full lg:w-1/2 px-10 lg:px-0">
        <h2 class="font-normal mb-6 text-3xl text-white">
          Sign In to Your Account
        </h2>

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
              @keyup.enter="userLogin"
              v-model="password"
              type="password"
              class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
              placeholder="Write your password here"
            />
          </div>
        </div>
        <div class="mb-6">
          <div class="mb-4">
            <button
              @click="userLogin"
              class="block w-full bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-4 text-lg rounded-full"
            >
              Sign In
            </button>
          </div>
        </div>
        <div class="text-center">
          <p class="text-white text-md">
            Don't have an account?
            <NuxtLink href="/register" class="no-underline text-orange-button">
              Sign Up
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRuntimeConfig } from "#imports";
import Swal from "sweetalert2";
import axios from "axios";

definePageMeta({
  layout: "auth",
});

const config = useRuntimeConfig();

const email = ref("");
const password = ref("");

const userLogin = async () => {
  try {
    const response = await axios.post(
      `${config.public.apiBase}/api/v1/sessions`,
      {
        email: email.value,
        password: password.value,
      }
    );

    const token = response.data?.data?.token;

    if (token) {
      localStorage.setItem("auth_token", token);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      navigateTo("/");
    } else {
      throw new Error("Invalid login response. Token not found.");
    }
  } catch (error) {
    console.error("Login Error:", error);

    let errorMessage =
      error?.response?.data?.errors ||
      "Login failed. Please check your credentials and try again.";

    Swal.fire({
      icon: "error",
      title: "Login Failed",
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

<style scoped>
.auth-background {
  background-image: url("/sign-in-background.jpg");
  background-position: center;
  background-size: cover;
}
</style>
