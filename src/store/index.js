/* 
* @Author: susuten
* @Date:   2018-09-13 23:27:09
* @Last Modified by:   susuten
* @Last Modified time: 2018-09-13 23:28:14
*/

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        userName: '',
    },
    mutations:{
        storeName(state,data){
            state.userName = data
        },
        
    }
})