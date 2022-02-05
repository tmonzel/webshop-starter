import { createApp } from 'vue'
import App from './App.vue'
import './styling.scss'
import { router } from './routings'

const app = createApp(App);
app.use(router);
app.mount('#app');
