<template>
  <div class="container mx-auto h-screen flex justify-center items-center">
    <div class="w-full lg:w-1/3 px-10 lg:px-0">
      <div class="flex justify-center items-center mx-auto mb-4 w-40">
        <div class="relative">
          <a href="/#">
            <img
              src="/avatar.jpg"
              alt=""
              class="rounded-full border-white border-4"
            />
            <img
              src="/icon-avatar-add.svg"
              alt=""
              class="absolute right-0 bottom-0 pb-2"
            />
          </a>
        </div>
      </div>
      <h2 class="font-normal mb-3 text-3xl text-white text-center">
        Hi, Julia
      </h2>
      <p class="text-white text-center font-light">Please upload your selfie</p>
      <div class="mb-4 mt-6">
        <div class="mb-3">
          <button
            @click="$router.push({ path: '/register-success' })"
            class="block w-full bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-4 text-lg rounded-full"
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

<script setup>
definePageMeta({
  layout: "auth",
});
</script>
