<template>
  <div class=" w-full h-full">
    <Header />
    <div class="w-full h-full" style="padding-top: 6.7rem;padding-bottom: 6.8rem;">
          <slot></slot>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import Header from "../includes/Header.vue";
import AppFooter from "../includes/AppFooter.vue";
export default {
  components: {
    Header,
    AppFooter,
  },
};
</script>