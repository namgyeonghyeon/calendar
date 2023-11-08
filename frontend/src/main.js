import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import VueTextareaAutosize from 'vue-textarea-autosize'
import VueAxios from 'vue-axios';
import axios from 'axios';
import router from './router'

Vue.use(VueTextareaAutosize)
Vue.use(VueAxios, axios);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
