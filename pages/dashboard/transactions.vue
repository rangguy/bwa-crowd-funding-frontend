<template>
  <div class="project-page">
    <section class="dashboard-header pt-5 px-20">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>
    <section class="container mx-auto pt-8 px-20">
      <div class="flex justify-between items-center mb-6">
        <div class="w-3/4 mr-6">
          <h2 class="text-4xl text-gray-900 mb-2 font-medium">Dashboard</h2>
          <ul class="flex mt-2">
            <li class="mr-6">
              <NuxtLink
                class="text-gray-500 hover:text-gray-800"
                to="/dashboard/index"
              >
                Your Projects
              </NuxtLink>
            </li>
            <li class="mr-6">
              <NuxtLink
                class="text-gray-800 font-bold"
                to="/dashboard/transactions"
              >
                Your Transactions
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="block mb-2">
        <div class="w-full lg:max-w-full lg:flex mb-4" v-for="i in 5" :key="i">
          <div
            class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            style="background-color: #bbb"
          ></div>
          <div
            class="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-8 flex flex-col justify-between leading-normal"
          >
            <div>
              <div class="text-gray-900 font-bold text-xl mb-1">
                Cari Uang Buat Gunpla
              </div>
              <p class="text-sm text-gray-600 flex items-center mb-2">
                Rp. 200.000.000 &middot; 12 September 2020
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="cta-clip -mt-20"></div>
    <section class="call-to-action bg-purple-progress pt-64 pb-10"></section>
    <Footer />
  </div>
</template>
