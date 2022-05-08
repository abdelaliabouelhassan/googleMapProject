<template>
  <div class="w-full bg-white shadow-sm p-5 fixed inset-x-0 bottom-0 border">
    <div class="w-full flex">
      <div class="m-auto flex items-center space-x-14">
        <div
          class="flex flex-col items-center cursor-pointer group"
          @click="goTo('saved-leads')"
        >
          <div>
            <IconCalendar class="text-primary-default" />
          </div>
          <span
            class="
              font-semibold
              text-lg
              group-hover:text-primary-default group-hover:text-opacity-80
            "
            :class="{
              'text-primary-default text-opacity-80':
                getRouteName == 'saved-leads',
            }"
            >Saved Leads</span
          >
        </div>
        <div
          class="
            flex flex-col
            items-center
            cursor-pointer
            relative
            space-y-10
            group
          "
          @click="goTo('home')"
        >
          <div
            class="
              flex
              w-20
              h-20
              rounded-full
              bg-primary-default
              absolute
              bottom-14
              shadow-md
            "
          >
            <IconHome class="text-white m-auto" />
          </div>
          <span
            class="
              font-semibold
              text-lg
              group-hover:text-primary-default group-hover:text-opacity-80
            "
            :class="{
              'text-primary-default text-opacity-80': getRouteName == 'home',
            }"
            >Property Search</span
          >
        </div>
        <div
          class="flex flex-col items-center cursor-pointer group"
          @click="goTo('my-account')"
        >
          <div>
            <IconUser class="text-primary-default" />
          </div>
          <span
            class="
              font-semibold
              text-lg
              group-hover:text-primary-default group-hover:text-opacity-80
            "
            :class="{
              'text-primary-default text-opacity-80':
                getRouteName == 'my-account',
            }"
            >My Account</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconCalendar from "../icons/Calendar.vue";
import IconUser from "../icons/User.vue";
import IconHome from "../icons/Home.vue";
export default {
  components: {
    IconCalendar,
    IconUser,
    IconHome,
  },
  computed: {
    getRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    goTo(name) {
      this.$router.push({ name: name });
    },
  },
};
</script>