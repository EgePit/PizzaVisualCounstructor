// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue';
import axios from 'axios';
Vue.prototype.$http = axios;

const app = new Vue({
    el: '#app',
    template: '<App/>',
    data: function() {
        return {
            api_url: 'http://localhost/test_api/',
            product:{},
            rules:{},
            layers:{},
            test: 123,
        }
    },
    methods: {
    },
    components: {
        App
    }
});
