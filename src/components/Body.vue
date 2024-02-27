<template>
  <div class="flex w-full flex-col sm:flex-row">
    <div class="w-4/5 bg-white">
      <div
        v-if="selectedCity"
        class="flex justify-between mt-5 mx-14 bg-blue-200 rounded-lg p-4"
      >
        <div>
          <h1 class="text-3xl font-bold">{{ selectedCity }}</h1>
          <p>{{ formatDate(weatherResponse?.data?.current?.dt) }}</p>
          <h1 class="text-8xl font-bold text-blue-500">
            {{ Math.round(weatherResponse?.data?.current?.temp) + "\u00B0C" }}
          </h1>
        </div>
        <div class="flex gap-16">
          <div class="flex flex-col items-center">
            <svg-icon
              type="mdi"
              :path="mdiWeatherSunsetUp"
              class="w-10 h-7 cursor-pointer font-extrabold"
            ></svg-icon>
            <span
              >{{
                formatHour(weatherResponse?.data?.current?.sunrise).hours
              }}:{{
                formatHour(weatherResponse?.data?.current?.sunrise).minutes
              }}</span
            >
          </div>
          <div class="flex flex-col items-center">
            <svg-icon
              type="mdi"
              :path="mdiWeatherSunsetDown"
              class="w-10 h-7 cursor-pointer font-extrabold"
            ></svg-icon>
            <span
              >{{ formatHour(weatherResponse?.data?.current?.sunset).hours }}:{{
                formatHour(weatherResponse?.data?.current?.sunset).minutes
              }}</span
            >
          </div>
          <div class="flex flex-col items-center">
            <svg-icon
              type="mdi"
              :path="mdiWeatherWindy"
              class="w-10 h-7 cursor-pointer font-extrabold"
            ></svg-icon>
            <span>{{ weatherResponse?.data?.current?.wind_speed }} m/s</span>
          </div>
          <div class="flex flex-col items-center">
            <svg-icon
              type="mdi"
              :path="mdiWater"
              class="w-10 h-7 cursor-pointer font-extrabold"
            ></svg-icon>
            <span>{{ weatherResponse?.data?.current?.humidity }} %</span>
          </div>
          <div class="flex flex-col items-center">
            <svg-icon
              type="mdi"
              :path="mdiEye"
              class="w-10 h-7 cursor-pointer font-extrabold"
            ></svg-icon>
            <span
              >{{ weatherResponse?.data?.current?.visibility / 1000 }} km</span
            >
          </div>
          <div class="flex flex-col items-center">
            <svg-icon
              type="mdi"
              :path="mdiThermometerLines"
              class="w-10 h-7 cursor-pointer font-extrabold"
            ></svg-icon>
            <span>
              {{
                Math.round(weatherResponse?.data?.current?.feels_like) +
                "\u00B0C"
              }}
            </span>
          </div>
        </div>
        <div v-if="weatherResponse" class="flex">
          <img
            :src="
              'https://openweathermap.org/img/wn/' +
              weatherResponse?.data?.current?.weather[0]?.icon +
              '@2x.png'
            "
            class="w-48"
            alt="weather photo"
          />
        </div>
      </div>
      <div v-else class="w-full h-full flex justify-center items-center">
        <h1 class="text-5xl">No data</h1>
      </div>
      <div class="w-full flex justify-center">
        <div
          class="flex w-11/12 text-center py-2 gap-1 overflow-scroll scrollbar-hide"
        >
          <ul
            v-for="(hour, index) in limitedHours"
            :key="hour.index"
            class="bg-blue-200 rounded-md"
          >
            <li class="w-20" v-if="index == 0">Now</li>
            <li class="w-20" v-else>
              {{ formatHour(hour?.dt).hours }}
            </li>
            <li>
              {{ Math.round(hour?.temp) + "\u00B0C" }}
            </li>
            <img
              :src="
                'https://openweathermap.org/img/wn/' +
                hour?.weather[0]?.icon +
                '@2x.png'
              "
              alt="weather photo"
            />
            <li class="text-xs">{{ hour?.weather[0]?.description }}</li>
          </ul>
        </div>
      </div>
      <div
        class="w-[95%] mx-8 flex flex-col sm:flex-row flex-wrap justify-around items-center"
      >
        <ul
          v-for="day in weatherResponse?.data?.daily"
          class="border-2 w-[47%] h-20 rounded-md bg-blue-200 shadow-lg m-1 flex items-center px-2"
        >
          <div class="w-16 h-10 font-medium text-sm">
            <li>
              {{ formatWeekday(day?.dt) }}
            </li>
          </div>
          <img
            :src="
              'https://openweathermap.org/img/wn/' +
              day?.weather[0]?.icon +
              '@2x.png'
            "
            class=""
            alt="weather photo"
          />
          <li>{{ Math.round(day?.temp?.min) + "\u00B0C" }}</li>
          <div class="p-2">
            <svg-icon
              type="mdi"
              :path="mdiThemeLightDark"
              class="text-black w-7 h-7 cursor-pointer font-extrabold"
            ></svg-icon>
          </div>
          <li>
            {{ Math.round(day?.temp?.max) + "\u00B0C" }}
          </li>
          <span class="text-xs pl-7">{{ day?.summary }}</span>
        </ul>
      </div>
    </div>

    <div class="border-2 border-white w-1/5 bg-white">
      <div class="flex justify-center my-3">
        <h1 class="font-medium text-2xl">Regions</h1>
      </div>
      <div class="">
        <ul
          v-for="(city, index) in cities"
          class="font-Roboto font-semibold cursor-pointer hover:text-xl duration-300 flex items-center"
          :class="
            city.name === selectedCity
              ? 'border-2 border-gray-200 shadow-lg bg-blue-200'
              : 'border-none'
          "
        >
          <li
            class="flex cursor-pointer m-3.5 items-center"
            :key="index"
            @click="selectCity(city.name)"
          >
            {{ city.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import axios from "axios";
  import formatDate from "../functions/formatDate";
  import formatHour from "../functions/formatHour";
  import formatWeekday from "../functions/formatWeekday";
  import SvgIcon from "@jamescoyle/vue-icon";
  import {
    mdiWeatherSunsetUp,
    mdiWeatherSunsetDown,
    mdiWeatherWindy,
    mdiWater,
    mdiEye,
    mdiThermometerLines,
    mdiThemeLightDark,
  } from "@mdi/js";

  const selectedCity = ref();
  const weatherResponse = ref();
  const APIkey = "94421a37c83f9845bcbdedba05ab60a3";

  const cities = ref([
    { id: 1, name: "Tashkent" },
    { id: 2, name: "Andijan" },
    { id: 3, name: "Namangan" },
    { id: 4, name: "Fergana" },
    { id: 5, name: "Sirdaryo" },
    { id: 6, name: "Bukhara" },
    { id: 7, name: "Jizzakh" },
    { id: 8, name: "Navoiy" },
    { id: 9, name: "Qarshi" },
    { id: 10, name: "Samarkand" },
    { id: 11, name: "Termez" },
    { id: 12, name: "Khiva" },
    { id: 13, name: "Nukus" },
  ]);

  async function selectCity(name) {
    try {
      selectedCity.value = name;

      const locationUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=${APIkey}`;
      const locationResponse = await axios.get(locationUrl);

      const lat = locationResponse.data[0].lat;
      const lon = locationResponse.data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.8/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${APIkey}&units=metric&lang=en`;

      weatherResponse.value = await axios.get(weatherUrl);

      const timestamp = weatherResponse.value.data.current.dt;

      console.log(weatherResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const limitedHours = computed(() =>
    weatherResponse.value?.data?.hourly.slice(0, 24)
  );
</script>

<style lang="scss" scoped>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
</style>
