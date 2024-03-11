import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from "pinia";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/admins/assets/css/sb-admin-2.min.css';
import './assets/admins/assets/vendor/fontawesome-free/css/all.min.css';
import './assets/admins/assets/css/custom.css';
import './assets/assets/css/all.min.css';
import './assets/assets/css/owl.carousel.css';
import './assets/assets/css/magnific-popup.css';
import './assets/assets/css/animate.css';
import './assets/assets/css/meanmenu.min.css';
import './assets/assets/css/main.css';
import './assets/assets/css/responsive.css';
import './assets/assets/js/jquery-1.11.3.min';
import './assets/assets/bootstrap/js/bootstrap.min';
import './assets/assets/js/jquery.isotope-3.0.6.min';
import './assets/assets/js/owl.carousel.min';
import './assets/assets/js/jquery.magnific-popup.min';
import './assets/assets/js/jquery.meanmenu.min';
import './assets/assets/js/sticker';
import './assets/assets/js/main';
import './assets/assets/js/jquery.countdown'

const pinia = createPinia();

import router from './router';

createApp(App).use(router).use(pinia).mount('#app');