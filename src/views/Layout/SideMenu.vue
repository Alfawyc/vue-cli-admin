<template>
    <div class="home rflex">
			<div class="menu_left cflex" :style="{width:sidebar.width+'px'}">
				<div class="menu_page_top rflex">
					<img :class='["logo",{"closeLogo":!sidebar.opened}]' :src="logo" alt="小爱admin" >
            		<span class='title' v-show="sidebar.opened">小爱<i>Admin</i></span>
				</div>
				<div class="menu_page_bottom is-scroll-left">
					<el-menu mode="vertical" theme="dark" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" :background-color="menuObj.bgColor" :text-color="menuObj.textColor" :active-text-color="menuObj.activeTextColor" :style="{width:sidebar.width+'px'}">
                        <template v-for="(item,index) in permission_routers">
                            <!--表示 有一级菜单-->
                            <router-link v-if="!item.hidden && item.noDropdown" :to="item.path" :key="index">
                                <el-menu-item class="dropItem" 
                                    :index="item.path"
                                    >
                                    <icon-svg v-if="item.icon" :icon-class="item.icon" />
                                    <span v-if="item.title" slot="title">{{ item.title }}</span> 
                                </el-menu-item>
                            </router-link>
                            <!--表示 有二级或者多级菜单 -->
                            <el-submenu v-if="item.children  && item.children.length >= 1"  :index="item.path" :key="index">
                                <template slot="title">
                                    <icon-svg v-if="item.icon" :icon-class="item.icon" />
                                    <span v-if="item.title" slot="title">{{ item.title }}</span>
                                </template>
                                <!--直接定位到子路由上，子路由也可以实现导航功能-->
                                <router-link v-for="(citem,cindex) in item.children" :to="getIindex(citem,item,cindex)"  :key="cindex">
                                    <el-menu-item  v-if="citem.title" :index="getIindex(citem,item,cindex)">
                                        <span slot="title"> {{ citem.title }}</span>
                                    </el-menu-item> 
                                </router-link>
                            </el-submenu>
                        </template>
                    </el-menu>
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
export default {
    name: 'Menu',
    data(){
        return {
			github : 'https://github.com/Alfawyc/vue-cli-admin/tree/develop',
			menuObj:{
				bgColor:'#fff',
				textColor:'#666',
				activeTextColor:'#ff6428',
            },
            topMenuObj:{
                bgColor:'',
                textColor:'#303133',
                activeTextColor:'#ff6428',
            },
			logo:logoImg,
			permission_routers : permission,
			langLogo:chinaImg,
			chinaImg:chinaImg,
			americaImg:americaImg,
			wechat:{
				wechatImg:wechatImg,
				isWechat:false
			},
			qq:{
				qqImg:qqImg,
				isQq:false,
			},
			changeBarDirection : false,
        }
    },
    computed:{
		matchedArr(){
            let title = [];
            let metaData = this.$route.matched;
            metaData.map((v , k) => {
                if(v.meta.title){
                    title.push(v.meta.title);
                }
            });
            return title;
		},
		...mapGetters([
			//'permission_routers',
			'isCollapse',
			'sidebar',
            'menuIndex',
            'name',
            'avatar'
        ]),headNavWidth(){
                return document.body.clientWidth - this.sidebar.width
            }
	},
    created(){

    },

    methods: {
        handleLeftMenu(){
            //折叠菜单
            store.commit('setLeftCollapse');
            store.commit('handleLeftMenu');
			this.changeBarDirection = !this.changeBarDirection;
		},
		getIindex(citem,item,cindex){
            //console.log(item.path + '/' + citem.path);
      		return item.path + '/' + citem.path;
        }
    }
}
</script>

<style lang="less" scoped>
    @left-bgColor:#fff;  // 左侧菜单背景颜色;
  @icon-link:#FF6C60;
    .menu_left{
        position: absolute;
        top:0;
        left:0;
        bottom:0;
    }
    .menu_page_top{
        width:100%;
        height: 60px;
        align-items: center;
        justify-content: space-around;
        text-transform: uppercase;
        box-sizing: border-box;
        box-shadow:0px 2px 5px 0px rgba(230,224,224,0.5);
        .logo {
            height: 36px;
            width: 36px;
            vertical-align: middle;
            display: inline-block;
        }
        .closeLogo{
            width:30px;
            height:30px;
        }
        .title{
            font-size: 22px;
            i{
                color:#FF6C60;
            }
        }
    }
  .menu_page_bottom {
      width:100%;
      overflow-y: scroll;
      overflow-x: hidden;
      flex:1;
      margin-top:3px;
      z-index: 10;
      box-shadow: 0 0 10px 0 rgba(230, 224, 224, 0.5)
  }
  .right-nav{
        display: flex;
        flex: 1;
        width:calc(100% - 180px);
        padding-right: 15px;
        justify-content: space-between;
        box-shadow:0px 2px 5px 0px rgba(237,233,233,0.5);
    }
    .head-nav {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 29;
        transition: width .2s;
        justify-content: space-between;
        height: 60px;
        box-sizing: border-box;
        background: #fff;
        .logout {
            vertical-align: middle;
            cursor: pointer;
        }
    }
    .middle{
       align-items: center;
       border:1px solid;
    }
    .userinfo-right{
        width:320px;
        padding: 0 10px;
        justify-content: space-between;
    }
    .userinfo {
        line-height: 60px;
        text-align:right;
    }
    .avatar{
        width: 32px;
        height: 32px;
        border-radius: 50%;
        vertical-align: middle;
        display: inline-block;
    }
    .langAvatar{
        width: 24px;
        height: 24px;
        border-radius: 50%;
        vertical-align: middle;
        display: inline-block;
    }
    .welcome{
        display: inline-block;
        vertical-align: middle;
        padding: 0 5px;
        .name{
            line-height: 20px;
            text-align: center;
            font-size: 12px;
        }
        .avatarname{
            color:#a9d86e;
            font-weight:bolder;
            font-size: 13px;
        }
    }

    .username {
        cursor: pointer;
        margin-right: 5px;
    }
    .border{
        border:1px solid;
    }
    .notify-row{
        line-height:60px;
        flex:1;
        ul{
           display: flex;
           justify-content: space-around;
        }
    }
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
    .bread_container{
		background-color: #eaebec;
		width: 100%;
		.bars{
			float: left;
            margin: 4px 10px;
			cursor: pointer;
			.isactive{
				-webkit-transform: rotate(90deg);
				transform: rotate(90deg);
				transition: .38s;
				-webkit-transform-origin: 50% 50%;
				transform-origin: 50% 50%;
			}
		}
		.breadcrumb{
			height: 30px;
			line-height: 30px;
			.breadbutton{
				float:left;
				margin:4px 5px 0 0;
				
			}
		}
	}
</style>