import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import '@/auth';
import './main.scss'
import './effects'
import { router } from './routings'

const app = createApp(App);
app.use(router);
app.mount('#app');