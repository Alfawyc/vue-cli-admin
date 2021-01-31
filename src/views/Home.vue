<template>
	<div class="home rflex">
        <!-- 侧边菜单 -->
		<side-menu></side-menu>
        <div class="menu_right wflex el-scrollbar" ref="menu_right" :style="{left:sidebar.width+'px'}">
            <top-bar></top-bar>
			<div class="menu_content" ref="menu_content">
                <!-- <tag-view></tag-view> -->
				<router-view></router-view>
			</div>
			<div class="footer">
				<p class="intro rflex">
					<span>xiaoai.Admin</span>
					<a :href='github' target="_blank">
					<icon-svg icon-class="iconGithub" />
					</a>
					<span>Alfa(微信号)</span>
				</p>
				<p class="beian">鄂ICP备18001612号</p>
			</div>
        </div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { permission } from '@/data/permission.js'
import wechatImg from "@/assets/img/wechat.jpg";
import qqImg from "@/assets/img/qq.png";
import logoImg from "@/assets/img/logo.png";
import chinaImg from "@/assets/img/china.svg";
import americaImg from "@/assets/img/america.svg";
import store from '@/store.js';
import TagView from 'views/Layout/TagView.vue';
import SideMenu from 'views/Layout/SideMenu.vue';
import TopBar from 'views/Layout/TopBar.vue'
export default {
	name : 'Home',
    components: {
        TagView,
        SideMenu,
        TopBar
	},
    data(){
        return {
			github : 'https://github.com/Alfawyc/vue-cli-admin/tree/develop',
        }
	},
	computed:{
	
		...mapGetters([
			//'permission_routers',
			'isCollapse',
			'sidebar',
            'menuIndex',
            //'avatar'
        ]),headNavWidth(){
                return document.body.clientWidth - this.sidebar.width
            }
	},
    created(){
        this.checkLogin();
    },
    methods :{
		setDialogInfo(type){
            if(type == 'logout'){
                _g.confirmMsg('warning' , '提示' , '确定要退出登录吗？' , () => {
                    Lockr.flush();
                    this.$router.push({ path : '/login' })
                })
                
            }
        },
        checkLogin(){
			_api.get('/base/check').then((res) => {
                console.log(res)
				if (res.code == 0){
					return false;
                }
				this.$router.push({ path :  '/login'});
			})
        }
    }
};
</script>

<style lang="less" scoped>
    ul.top-menu > li {
        position: relative;
    }
    .footer{
        width: 100%;
        padding: 10px 0;
        font-size:12px;
        text-align: center;
        background: #fff;
        p{
            line-height: 30px;
        }
        .intro{
            width: 240px;
            margin: 0 auto;
            justify-content: space-between;
            align-items: center;
        }
    }
    .home{
        .menu_right{
            overflow: auto;
            position: absolute;
            right:0;
            top:0;
            bottom:0;
            background:#F6F7FC;
            .menu_content{
                position: relative;
                margin-top:60px;
                width:100%;
                background:#f0f2f5;
            }

        }
    }
</style>