<template>
	<div class="home rflex">
		<div class="home rflex">
			<div class="menu_left cflex" :style="{width:sidebar.width+'px'}">
				<div class="menu_page_top rflex">
					<img :class='["logo",{"closeLogo":!sidebar.opened}]' :src="logo" alt="小爱admin" >
            		<span class='title' v-show="sidebar.opened">小爱<i>Admin</i></span>
				</div>
				<div class="menu_page_bottom is-scroll-left">
					<el-menu 
                mode="vertical"
                theme="dark" 
                :show-timeout="200"
                :default-active="$route.path" 
                :collapse="isCollapse"
                :background-color="menuObj.bgColor"
                :text-color="menuObj.textColor"
                :active-text-color="menuObj.activeTextColor"
                :style="{width:sidebar.width+'px'}"
                >
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
        <div class="menu_right wflex el-scrollbar" ref="menu_right" :style="{left:sidebar.width+'px'}">
            <header class="head-nav rflex" :style="{'width':headNavWidth+'px'}" id='header_container'>
                <div class="right-nav" ref="rightNav">
                    <!-- top menu -->
					<div class="menu_top wflex rflex" ref="menuTop">
					</div>
                    <div class="userinfo-right rflex">
                        <div class="notify-row">
							<ul class="top-menu">
								<li class="li-badge">
									<el-tooltip class="item" effect="dark" content="访问github" placement="top">
										<a :href='github' target="_blank">
											<icon-svg icon-class="iconGithub" />
										</a>
									</el-tooltip>
								</li>
								<li class="li-badge">
									<a :href='github' target="_blank" v-popover:qcode>
										<icon-svg icon-class="iconwechat" />
										<el-popover	ref="qcode"	popper-class="qcodepopper" placement="bottom" trigger="hover">
											<div class="wechat-area cflex">
												<p class="titles">加我微信</p>
												<img :src="wechat.wechatImg" alt="加我微信"  />
											</div>
										</el-popover>
									</a>
								</li>
								<li class="li-badge">
									<a :href='github' target="_blank" v-popover:qqcode>
										<icon-svg icon-class="iconqq" />
										<el-popover	ref="qqcode" popper-class="qcodepopper" placement="bottom" trigger="hover">
											<div class="wechat-area cflex">
												<p class="titles">加入qq群</p>
												<img :src="qq.qqImg" alt="加入qq群"  />
											</div>
										</el-popover>
									</a>
								</li>
							</ul>
						</div>
                        <div class="userinfo">
                            <el-menu class="el-menu-demo" mode="horizontal">
								<el-submenu index="1" popper-class="langItem">
									<template slot="title">
										<img :src="langLogo" class='langAvatar' alt="">
									</template>
									<el-menu-item index="1-1" @click="changeLocale('zh')">
										<img :src="chinaImg" class='langAvatar' alt="">
										<span class="intro">中文</span>
									</el-menu-item>
									<el-menu-item index="1-2" @click="changeLocale('en')">
										<img :src="americaImg" class='langAvatar' alt="">
										<span class="intro">EngList</span>
									</el-menu-item>
								</el-submenu>
								<el-submenu index="2"  popper-class="infoItem">
									<template slot="title">
										<div class='welcome'>
											<span class="name">hi,</span>
											<span class='name avatarname'> 管理员</span>
										</div>
										<img :src="avatar" class='avatar' alt="">
									</template>
									<el-menu-item index="2-1" @click="setDialogInfo('info')">个人信息</el-menu-item>
									<el-menu-item index="2-2" @click="setDialogInfo('pass')">修改密码</el-menu-item>
									<el-menu-item index="2-3" @click="setDialogInfo('logout')">退出</el-menu-item>
								</el-submenu>
                    		</el-menu>
                        </div>
                    </div>
                </div>
            </header>
			<div class="menu_content" ref="menu_content">
				<!-- bread -->
				<div class="bread_container" id="bread_container">
					<span @click="handleLefeMenu" class="bars"> 
						<icon-svg icon-class="iconmenu-fold" :class="{isactive:changeBarDirection}" />
					</span>
					<el-breadcrumb class="breadcrumb" separator="/">
						<el-breadcrumb-item v-for='(name,index) in matchedArr' :key='index'>
							{{ name }}
						</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
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
export default {
	name : 'Home',
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
		console.log(this.permission_routers);
        console.log('this is 12334');
    },
    methods :{
		setDialogInfo(){
			
		},
		changeLocale(){

		},
		handleLefeMenu(){
			this.$store.dispatch('setLeftCollapse');  // 折叠菜单
			this.$store.dispatch('handleLeftMenu');  // 改变菜单宽度 180->35/35-180
			this.changeBarDirection = !this.changeBarDirection;
		},
		getIindex(citem,item,cindex){
            console.log(item.path + '/' + citem.path);
      		return item.path + '/' + citem.path;
        }
    }
};
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
</style>