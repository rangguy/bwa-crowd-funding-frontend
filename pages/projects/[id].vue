<template>
  <div class="project-page">
    <section class="project-header pt-5 px-20">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>
    <section class="container project-container mx-auto -mt-56 px-20">
      <div class="flex mt-3">
        <div class="w-3/4 mr-6">
          <div class="bg-white p-3 mb-3 border border-gray-400 rounded-20">
            <figure class="item-image">
              <img src="/project-image.jpg" alt="" class="rounded-20 w-full" />
            </figure>
          </div>
          <div class="flex -mx-2">
            <div
              class="relative w-1/4 bg-white m-2 p-2 border border-gray-400 rounded-20"
            >
              <figure class="item-thumbnail">
                <img
                  src="/project-slider-1.jpg"
                  alt=""
                  class="rounded-20 w-full"
                />
              </figure>
            </div>
            <div
              class="relative w-1/4 bg-white m-2 p-2 border border-gray-400 rounded-20"
            >
              <figure class="item-thumbnail">
                <img
                  src="/project-slider-2.jpg"
                  alt=""
                  class="rounded-20 w-full"
                />
              </figure>
            </div>
            <div
              class="relative w-1/4 bg-white m-2 p-2 border border-gray-400 rounded-20"
            >
              <figure class="item-thumbnail">
                <img
                  src="/project-slider-3.jpg"
                  alt=""
                  class="rounded-20 w-full"
                />
              </figure>
            </div>
            <div
              class="relative w-1/4 bg-white m-2 p-2 border border-gray-400 rounded-20"
            >
              <figure class="item-thumbnail">
                <img
                  src="/project-slider-4.jpg"
                  alt=""
                  class="rounded-20 w-full"
                />
              </figure>
            </div>
          </div>
        </div>
        <div class="w-1/4">
          <div
            class="bg-white w-full p-5 border border-gray-400 rounded-20 sticky"
            style="top: 15px"
          >
            <h3>Project Leader:</h3>

            <div class="flex mt-3">
              <div class="w-1/4">
                <img
                  src="/testimonial-1-icon.png"
                  alt=""
                  class="w-full inline-block rounded-full"
                />
              </div>
              <div class="w-3/4 ml-5 mt-1">
                <div class="font-semibold text-xl text-gray-800">
                  Julia Keeva
                </div>
                <div class="font-light text-md text-gray-400">
                  28.093 backer
                </div>
              </div>
            </div>

            <h4 class="mt-5 font-semibold">What will you get:</h4>
            <ul class="list-check mt-3">
              <li>Equity of the startup directly from the founder</li>
              <li>Special service or product that startup has</li>
              <li>You can also sell your equity once the startup going IPO</li>
            </ul>
            <input
              type="number"
              class="border border-gray-500 block w-full px-6 py-3 mt-4 rounded-full text-gray-800 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
              placeholder="Amount in Rp"
              value=""
            />
            <NuxtLink
              to="/fund-success"
              class="text-center mt-3 button-cta block w-full bg-orange-button hover:bg-green-button text-white font-medium px-6 py-3 text-md rounded-full"
            >
              Fund Now
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <section class="container mx-auto pt-8 px-20">
      <div class="flex justify-between items-center">
        <div class="w-full md:w-3/4 mr-6">
          <h2 class="text-4xl text-gray-900 mb-2 font-medium">
            Wireboard Fortune
          </h2>
          <p class="font-light text-xl mb-5">
            The new era of mechanical keyboard for everyone
          </p>

          <div class="relative progress-bar">
            <div
              class="overflow-hidden mb-4 text-xs flex rounded-full bg-gray-200 h-6"
            >
              <div
                style="width: 80%"
                class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-progress progress-striped"
              ></div>
            </div>
          </div>
          <div class="flex progress-info mb-6">
            <div class="text-2xl">80%</div>
            <div class="ml-auto font-semibold text-2xl">Rp 40.000.000</div>
          </div>

          <p class="font-light text-xl mb-5">
            Designed to fit your dedicated typing experience. No matter what you
            like, linear, clicky or a little in between, we’ve got you covered
            with three Gateron switches options (Blue, Brown, Red). With a
            lifespan of 50 million keystroke lifespan we want to make sure that
            you experience same feedback for every keystroke.
          </p>
          <p class="font-light text-xl mb-5">
            With N-key rollover (NKRO on wired mode only) you can register as
            many keys as you can press at once without missing out characters.
            It allows to use all the same media keys as conventional macOS.
          </p>
          <p class="font-light text-xl mb-5">
            This keyboard can last up to 72 hours typing, or up to 9 days of
            normal use (8 hrs/day) with a 4000 mAh big battery.
          </p>
        </div>
        <div class="w-1/4 hidden md:block"></div>
      </div>
    </section>
    <div class="cta-clip -mt-20"></div>
    <CallToAction />
    <Footer />
  </div>
</template>
