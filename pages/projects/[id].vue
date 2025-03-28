<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const campaign = ref(null);
const config = useRuntimeConfig();
const mainImage = ref(null);

const fetchCampaign = async () => {
  try {
    const { data } = await axios.get(
      `${config.public.apiBase}/api/v1/campaigns/${route.params.id}`
    );
    campaign.value = data;

    setPrimaryImage();
  } catch (error) {
    console.error("Error fetching campaign data:", error);
  }
};

// Progress Bar Calculation
const progressPercentage = computed(() => {
  if (!campaign.value?.data) return 0;
  return (
    (campaign.value.data.current_amount / campaign.value.data.goal_amount) * 100
  );
});

// Format Rupiah
const formattedGoalAmount = computed(() => {
  if (!campaign.value?.data) return "0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(campaign.value.data.goal_amount);
});

const setPrimaryImage = () => {
  if (
    !campaign.value?.data?.images ||
    campaign.value.data.images.length === 0
  ) {
    mainImage.value = "/project-image.jpg";
    return;
  }

  // Cari gambar dengan is_primary: true
  const primaryImage = campaign.value.data.images.find(
    (image) => image.is_primary
  );

  mainImage.value = primaryImage
    ? `${config.public.apiBase}/${primaryImage.image_url}`
    : `${config.public.apiBase}/${campaign.value.data.images[0].image_url}`;
};

const changeMainImage = (imageUrl) => {
  mainImage.value = `${config.public.apiBase}/${imageUrl}`;
};

onMounted(fetchCampaign);
</script>

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
              <img
                :src="mainImage"
                alt="Project Image"
                class="rounded-20 w-full"
              />
            </figure>
          </div>
          <div class="flex -mx-2">
            <div
              v-for="(image, index) in campaign?.data?.images || []"
              :key="index"
              class="relative w-1/4 bg-white m-2 p-2 border border-gray-400 rounded-20 cursor-pointer"
              @click="changeMainImage(image.image_url)"
            >
              <figure class="item-thumbnail">
                <img
                  :src="`${config.public.apiBase}/${image.image_url}`"
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
                  :src="`${config.public.apiBase}/${campaign?.data?.user?.image_url}`"
                  alt=""
                  class="w-full inline-block rounded-full"
                />
              </div>
              <div class="w-3/4 ml-5 mt-1">
                <div class="font-semibold text-xl text-gray-800">
                  {{ campaign?.data?.user?.name || "Unknown" }}
                </div>
                <div class="font-light text-md text-gray-400">
                  {{ campaign?.data?.backer_count || 0 }}
                </div>
              </div>
            </div>
            <h4 class="mt-5 font-semibold">What will you get:</h4>
            <ul class="list-check mt-3">
              <li
                v-for="(perk, index) in campaign?.data?.perks || []"
                :key="index"
              >
                {{ perk }}
              </li>
            </ul>
            <input
              type="number"
              class="border border-gray-500 block w-full px-6 py-3 mt-4 rounded-full text-gray-800 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
              placeholder="Amount in Rp"
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
            {{ campaign?.data?.name || "Campaign Name" }}
          </h2>
          <p class="font-light text-xl mb-5">
            {{
              campaign?.data?.short_description || "No description available."
            }}
          </p>
          <div class="relative progress-bar">
            <div
              class="overflow-hidden mb-4 text-xs flex rounded-full bg-gray-200 h-6"
            >
              <div
                :style="{ width: progressPercentage + '%' }"
                class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-progress progress-striped"
              ></div>
            </div>
          </div>
          <div class="flex progress-info mb-6">
            <div class="text-2xl">{{ progressPercentage.toFixed(2) }}%</div>
            <div class="ml-auto font-semibold text-2xl">
              {{ formattedGoalAmount }}
            </div>
          </div>
          <p class="font-light text-xl mb-5">
            {{
              campaign?.data?.description ||
              "No detailed description available."
            }}
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
