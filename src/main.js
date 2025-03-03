import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './firebase/index'
let app

auth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)
            .use(router)
            .mount('#app')
    }
})


