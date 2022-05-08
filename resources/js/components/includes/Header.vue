<template>
  <div class="w-full bg-white p-4 shadow-sm fixed inset-x-0 top-0">
    <div class="w-full flex justify-between items-center">
      <div class="">
        <img src="../../assets/images/logo.png" alt="" />
        <img src="../../assets/images/marker.png" hidden alt="">
      </div>
      <div class="relative max-w-xl w-full">
        <GMapAutocomplete
          placeholder="7351 E. Rustling Pass Scottsdale AZ 85255"
          @place_changed="setPlace"
          class="
            py-2
            px-6
            rounded-full
            border border-white-100
            bg-white
            placeholder-gray-200
            text-lg text-gray-200
            outline-none
            max-w-xl
            w-full
          "
        >
        </GMapAutocomplete>

        <button
          class="
            text-white
            h-full
            w-28
            shadow-2xl
            flex
            font-bold
            text-xl
            rounded-r-full
            bg-primary-default
            absolute
            right-0
            top-0
          "
        >
          <span class="m-auto">Search</span>
        </button>
      </div>
      <button class="relative">
        <IconBell class="text-gray-900" />
        <div
          class="
            w-2.5
            h-2.5
            rounded-full
            bg-red-100
            absolute
            top-0
            right-0
            shadow-sm
          "
        ></div>
      </button>
    </div>
  </div>
</template>


<script>
import IconBell from "../icons/Bell.vue";
export default {
  components: {
    IconBell,
  },
  methods: {
    setPlace(e) {
      this.$store.commit("setSearchResult", e);
    },
  },
};
</script>


