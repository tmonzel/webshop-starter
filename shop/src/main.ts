import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import './main.scss'
import { router } from './routings'

const app = createApp(App);
app.use(router);
app.mount('#app');
