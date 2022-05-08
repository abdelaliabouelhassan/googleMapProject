<template>
  <MainLaoout>
    <div class="bg-gray-100 w-full h-full relative">
      <div
        class="
          bg-white
          rounded-md
          p-5
          flex flex-col
          items-center
          shadow-sm
          space-y-4
          absolute
          left-2
          top-2
          max-w-xs
          w-full
          text-center
          z-10
        "
        v-if="getSearchResult.formatted_address"
      >
        <span class="text-lg font-medium">{{
          getSearchResult.formatted_address
        }}</span>
        <span class="text-base text-gray-300 font-medium"
          >York Myers & Haley Myers</span
        >
        <div
          class="
            h-32
            w-32
            overflow-hidden
            rounded-full
            ring ring-primary-default
          "
        >
          <img
            class="w-full h-full"
            :src="getSearchResult.LocationImage"
            alt=""
          />
        </div>
        <div class="w-full h-full">
          <div class="w-full bg-gray-100 h-px"></div>
        </div>
        <button
          class="
            font-medium
            text-base text-primary-default
            py-2
            px-6
            rounded-full
            ring-2 ring-primary-default
            whitespace-nowrap
          "
        >
          Create Lead
        </button>
      </div>
      <div
        class="
          z-50
          absolute
          flex flex-col
          items-center
          text-center
          space-y-10
          bottom-5
          right-2
        "
      >
        <div
          class="
            rounded-md
            bg-white bg-opacity-80
            shadow-md
            overflow-hidden
            text-center
            flex flex-col
          "
        >
          <button
            id="Aim"
            class="bg-white bg-opacity-10 hover:bg-opacity-100 w-full h-full"
          >
            <IconAim />
          </button>
        </div>
        <div
          class="
            rounded-md
            bg-white bg-opacity-90
            flex flex-col
            items-center
            shadow-md
            overflow-hidden
            text-center
          "
        >
          <button
            id="Minus"
            @click="Zoomthemap"
            class="bg-white bg-opacity-10 hover:bg-opacity-100 w-full h-full"
          >
            <Minus />
          </button>
          <div class="w-full px-2 py-1 bg-opacity-100 bg-white">
            <div class="w-full h-px bg-gray-300"></div>
          </div>
          <button
            id="Plus"
            @click="Zoomthemap"
            class="bg-white bg-opacity-10 hover:bg-opacity-100 w-full h-full"
          >
            <IconPlus />
          </button>
        </div>
      </div>

      <div class="w-full h-full">
        <GMapMap
          map-type-id="roadmap"
          :center="getSearchResult.center"
          :zoom="15"
          style="width: 100%; height: 100%"
          ref="myMapRef"
          :disableDefaultUI="true"
        >
         
          <GMapMarker  :icon="{
              url: 'https://i.ibb.co/7bR5mBx/marker.png',
              scaledSize: { width: 30, height: 30 },
              labelOrigin: { x: 16, y: -10 },
            }" :position="getSearchResult.center" />
        </GMapMap>
      </div>
    </div>
  </MainLaoout>
</template>


<script>
import MainLaoout from "../layouts/MainLayout.vue";
import IconPlus from "../icons/Plus.vue";
import Minus from "../icons/Minus.vue";
import IconAim from "../icons/Aim.vue";
import { mapGetters } from "vuex";
import { useStore } from "vuex";

import { onMounted, ref, watch } from "vue";
function AddCustomButton(map, store) {
  //on click of button, zoom in
  const Plusbtn = document.getElementById("Plus");
  const Minusbtn = document.getElementById("Minus");
  const Aimbtn = document.getElementById("Aim");
  Plusbtn.addEventListener("click", () => {
    map.setZoom(map.getZoom() + 1);
  });
  Minusbtn.addEventListener("click", () => {
    map.setZoom(map.getZoom() - 1);
  });
  Aimbtn.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos);
          store.state.search.result.center = pos;
          store.state.search.result.formatted_address = "";
          map.setZoom(15);
        },
        function () {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}
export default {
  setup() {
    const store = useStore();
    const myMapRef = ref();
    watch(myMapRef, (googleMap) => {
      if (googleMap) {
        googleMap.$mapPromise.then((map) => {
          AddCustomButton(map, store);
          //Hiding Map Features With Styling
          map.setOptions({
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [
                  {
                    visibility: "off",
                  },
                ],
              },
            ],
          });
        });
      }
    });
    onMounted(() => {
      //get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
              store.state.search.result.center = pos;
              store.state.search.result.formatted_address = "";
          },
          function () {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    });

    return {
      myMapRef,
    };
  },
  data() {
    return {
      place: "",
    };
  },
  computed: {
    ...mapGetters({
      getSearchResult: "getSearchResult",
    }),
  },
  methods: {
    getAddresses() {
      this.$store.dispatch("getAddresses");
    },
    getLoaction(marker) {
      return {
        lat: Number(marker.location.latitude),
        lng: Number(marker.location.longitude),
      };
    },
  },
  components: {
    MainLaoout,
    IconPlus,
    Minus,
    IconAim,
  },
  created() {
  },
};
</script>

<style>
.vue-map-container {
  height: 100% !important;
}
.gmnoprint {
  display: none !important;
}
.gm-fullscreen-control {
  display: none !important;
}
</style>



