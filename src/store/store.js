import Vue from 'vue'
import Vuex from 'vuex';
 
Vue.use(Vuex);
 
const store = new Vuex.Store({
    state: {
        LOADING: false, //loading开关
        name: '', //个人信息name
        phone: '', //个人信息phone
        address: '', //个人信息address
    },
    mutations: {
        showLoading(state){
            state.LOADING = true    
        },
        hideLoading (state) {
            state.LOADING = false
        },
        updataName(state, name){
            state.name = name;
        },
        updataPhone(state, phone){
            state.phone = phone;
        },
        updataAddress(state, address){
            state.address = address;
        }
    }
})

export default store