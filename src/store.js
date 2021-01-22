import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	sidebar: {
		opened: true,
		width: 180
	},
	isCollapse:false, // 菜单默认展开
	isFooter:false,
	name:'',
	avatar:'',
	minLeftMenuWidth:35,
	maxLeftMenuWidth:180,
}

const getters = {
	sidebar:state => state.sidebar,
	isCollapse:state => state.isCollapse,
	isFooter:state => state.isFooter,
	avatar: state => state.avatar,
	name: state => state.name,
}

const mutations = {
	handleLeftMenu(state){
		if(state.sidebar.opened){
			state.sidebar.width = state.minLeftMenuWidth;
		} else {
			state.sidebar.width = state.maxLeftMenuWidth;
		}
		state.sidebar.opened = !state.sidebar.opened
	},
	initLeftMenu(state){
		state.sidebar = state.sidebar
	},
	setLeftCollapse(state){
		state.isCollapse = !state.isCollapse
	},
	setLocalUser(state , userDate){
		console.log("store set userinfo")
		state.name = userDate.nickname;
		state.avatar = userDate.avatar;
	}
}
export default new Vuex.Store({
	state,
	getters,
	mutations,
})
