import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.ts'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const options = {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
};


createApp(App)
  .use(router)
  .use(Toast, options)
.mount('#app')
