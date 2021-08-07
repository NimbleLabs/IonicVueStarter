import { createApp } from 'vue'
import App from './App.vue'

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

function checkAuthentication() {

  if(window.localStorage.getItem('STARTER_SYSTEM_ID')) {
    let authToken = window.localStorage.getItem('STARTER_SYSTEM_ID')
    console.log('Auth token: ' + authToken)
    return true
  }

  return false
}

import router from './router';
router.beforeEach((to, from, next) => {

  if (to.name === 'sign-in') {
    next()
  }
  else if (to.name !== 'sign-up' && !checkAuthentication()) {
    console.log('Interrupt')
    console.log(to.name)
    next({ name: 'sign-in' })
  }
  else {
    next()
  }
})

const app = createApp(App)
  .use(IonicVue)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});