<template>
  <div class="auth-page">
    <slot />
  </div>
</template>

<style>
html {
  font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.auth-page {
  background-color: #3b41e3;
  background-image: url("/auth-background.svg");
  background-position: top right;
  background-repeat: no-repeat;
}
</style>
