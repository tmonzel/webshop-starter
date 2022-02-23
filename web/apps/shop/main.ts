import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap';
import './main.scss';
import './effects';
import './auth';
import { router } from './routing';

// Load fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const app = createApp(App);
app.use(router);
app.mount('#app');
