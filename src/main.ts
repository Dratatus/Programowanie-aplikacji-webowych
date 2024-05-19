import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes';
import GoogleAuthService from './services/auth/google-auth-service';

const app = createApp(App);
GoogleAuthService.loadUserFromLocalStorage();
app.use(router);
app.mount('#app');
