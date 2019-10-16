import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		sidebar: {
			opened: true,
			width: 180
		},
		isCollapse:false, // 菜单默认展开
		isFooter:false,
		name:'',
    	avatar:'',
	},
	getters : {
        sidebar:state => state.sidebar,
        isCollapse:state => state.isCollapse,
		isFooter:state => state.isFooter,
		avatar: state => state.avatar,
    	name: state => state.name,
    },
	mutations: {

	},
	actions: {

	}
})
