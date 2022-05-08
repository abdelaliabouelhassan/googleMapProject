require('./bootstrap');

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import VueGoogleMaps from '@fawmi/vue-google-maps'

import App from './App.vue'
import routes from './router/routes'

import  store  from './store/store.js'

import axios from 'axios'
import VueAxios from 'vue-axios'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router)
  .use(store)
  .use(
    VueGoogleMaps, {
    load: {
      key: 'AIzaSyBjRBz9TcjUkmMgBcWP1-Qgf-lLIdmuQCE',
      libraries: "places"
      // language: 'de',
    },
  }
  )
  .use(VueAxios, axios)
  .mount('#app')