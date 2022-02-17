import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap';
import './main.scss';
import './effects';
import './auth';
import { router } from './routing';

const app = createApp(App);
app.use(router);
app.mount('#app');
