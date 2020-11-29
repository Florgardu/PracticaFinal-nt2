import { createApp } from 'vue'
import App from './App.vue'
import { VuelidatePlugin } from '@vuelidate/core'
import './bootstrap'


createApp(App)
.use(VuelidatePlugin)
.mount('#app')