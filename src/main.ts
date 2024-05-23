import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { InstallCodemirro } from 'codemirror-editor-vue3';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';
const app = createApp(App)
app.use(router);
app.use(InstallCodemirro);
app.use(store);
app.mount('#app')

