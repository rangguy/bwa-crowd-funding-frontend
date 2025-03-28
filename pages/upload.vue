<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRuntimeConfig } from "#imports";
import Swal from "sweetalert2";

definePageMeta({
  layout: "auth",
});

const config = useRuntimeConfig();
const isAuthenticated = ref(false);
const userData = ref(null);
const loading = ref(true);
const avatarUrl = ref("/avatar.jpg");
const fileInput = ref(null);
const selectedFile = ref(null);

const checkAuthStatus = async () => {
  loading.value = true;

  const token = localStorage.getItem("auth_token");
  if (!token) {
    isAuthenticated.value = false;
    userData.value = null;
    loading.value = false;
    return;
  }

  try {
    const response = await axios.get(
      `${config.public.apiBase}/api/v1/users/fetch`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data?.data) {
      isAuthenticated.value = true;
      userData.value = response.data.data;
      if (userData.value.avatar_url) {
        avatarUrl.value = userData.value.avatar_url;
      }
    } else {
      isAuthenticated.value = false;
      userData.value = null;
      localStorage.removeItem("auth_token");
    }
  } catch (error) {
    console.error("Auth check error:", error);
    isAuthenticated.value = false;
    userData.value = null;
    localStorage.removeItem("auth_token");
  } finally {
    loading.value = false;
  }
};

const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (!file || !["image/jpeg", "image/png"].includes(file.type)) {
    Swal.fire({
      icon: "error",
      title: "Invalid File",
      text: "Only JPG and PNG files are allowed.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    return;
  }

  // Simpan file untuk diunggah nanti
  selectedFile.value = file;
  avatarUrl.value = URL.createObjectURL(file);
};

const uploadAvatar = async () => {
  if (!selectedFile.value) {
    Swal.fire({
      icon: "error",
      title: "No File Selected",
      text: "Please select an image before signing up.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    return;
  }

  const formData = new FormData();
  formData.append("avatar", selectedFile.value);

  try {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You need to log in first.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    const response = await axios.post(
      `${config.public.apiBase}/api/v1/avatars`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    Swal.fire({
      icon: "success",
      title: "Upload Successful",
      text: "Your avatar has been updated!",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    if (response.data && response.data.avatar_url) {
      avatarUrl.value = response.data.avatar_url;
    }

    navigateTo("/register-success");
  } catch (error) {
    console.error("Upload Error:", error);
    Swal.fire({
      icon: "error",
      title: "Upload Failed",
      text: "Something went wrong. Please try again.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }
};

onMounted(() => {
  checkAuthStatus();
});

const triggerFileInput = () => {
  fileInput.value.click();
};
</script>

<template>
  <div class="container mx-auto h-screen flex justify-center items-center">
    <div class="w-full lg:w-1/3 px-10 lg:px-0">
      <div class="flex justify-center items-center mx-auto mb-4 w-40">
        <div class="relative">
          <!-- Avatar -->
          <a href="#" @click.prevent="triggerFileInput">
            <img
              v-if="avatarUrl"
              :src="avatarUrl"
              alt="User Avatar"
              class="rounded-full border-white border-4 cursor-pointer"
            />
            <img
              src="/icon-avatar-add.svg"
              alt="Add Avatar Icon"
              class="absolute right-0 bottom-0 pb-2 cursor-pointer"
            />
          </a>
          <!-- Input File (Hidden) -->
          <input
            ref="fileInput"
            type="file"
            accept="image/jpeg, image/png"
            class="hidden"
            @change="handleFileChange"
          />
        </div>
      </div>

      <!-- Loading state -->
      <h2
        v-if="loading"
        class="font-normal mb-3 text-3xl text-white text-center"
      >
        Loading...
      </h2>
      <!-- User name -->
      <h2
        v-else-if="userData?.name"
        class="font-normal mb-3 text-3xl text-white text-center"
      >
        {{ userData.name }}
      </h2>
      <!-- Default Unknown User -->
      <h2 v-else class="font-normal mb-3 text-3xl text-white text-center">
        Unknown User
      </h2>

      <p class="text-white text-center font-light">Please upload your selfie</p>
      <div class="mb-4 mt-6">
        <div class="mb-3">
          <button
            @click="uploadAvatar"
            :disabled="!selectedFile"
            class="block w-full bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-4 text-lg rounded-full transition-all duration-300"
            :class="{ 'opacity-50 cursor-not-allowed': !selectedFile }"
          >
            Sign Up Now
          </button>
        </div>
      </div>
      <div>
        <div class="mb-4">
          <button
            @click="$router.push({ path: '/register-success' })"
            class="block w-full bg-transparent border-white border hover:bg-white hover:bg-opacity-25 text-white font-light px-6 py-4 text-lg rounded-full"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
