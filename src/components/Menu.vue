<template>
	<div class="wrapper">
		<!-- Top start -->
		<header class="main-header">
			<!-- Header Navbar start -->
			<nav class="navbar navbar-static-top">				
				<!-- Logo start-->
				<a href="javascript:;" class="logo">					
					<!-- logo -->
					<span class="logo-lg am-ft-left pl10">
						<small class="am-ft-16">江南布衣核算查询管理系统</small>
					</span>
				</a>
				<!-- Logo end -->
				<!-- Navbar Right Menu start -->
				<div class="navbar-custom-menu">
					<ul class="nav navbar-nav">
						<li class="loginTime">{{userType}}</li>
						<!-- User -->
						<li class="user user-menu">
							<a href="javascript:;">{{userName}}</a>
						</li>
						<li class="user wsList-menu" v-if="list!=''">
							<a href="javascript:;" @click="showWsList=true">{{list.length}}条消息待查看</a>
							<div class="wsList" v-show="showWsList==true" @click="showWsList=false">
								<span v-for="(item,index) in list">{{index+1}}.{{item.data}}<i class="mgl10 fn-right">---{{item.time}}</i></span>
								<p class="wsTip">--轻触弹窗以关闭--</p>
							</div>
						</li>						
						<!-- Exit -->
						<li>
							<a href="javascript:;" class="top-exit" @click="exitLogin()">退出登录</a>
						</li>
					</ul>
				</div>
			</nav>
		</header>
		<!-- Top end -->
		
		<!---- Left side start ---->
		<aside class="main-sidebar fixed-main-sidebar">
			<!-- sidebar -->
			<section class="sidebar">
				<!-- sidebar menu -->
				<ul class="sidebar-menu fn-left">
					<li class="active treeview" @click="goPage('1')">
						<a href="javascript:;">
							<i class="fa fa-line-chart"></i>
							<span>管理首页</span>
						</a>
					</li>
					<li class="treeview" v-if="usertp != '1'">
						<a href="javascript:;" @click="toggle(1)">
							<i class="fa fa-cog"></i>
							<span>绩效查询</span>
						</a>
						<ul class="inner-menu" v-show="open1">
							<li class="active">
								<router-link :to="{name:'JxQuery',params: {num: '1'}}" tag="a">店员</router-link>
								<router-link :to="{name:'dzJxQuery',params: {num: '0'}}" tag="a">店长</router-link>
								<router-link :to="{name:'dzJxQuery',params: {num: '2'}}" tag="a">大店长</router-link>
								<router-link :to="{name:'dzJxQuery',params: {num: '1'}}" tag="a">销售主管</router-link>
								<router-link :to="{name:'csJxQuery',params: {num: '4'}}" tag="a">城市经理</router-link>
								<router-link :to="{name:'dqJxQuery',params: {num: '5'}}" tag="a">大区经理</router-link>
							</li>
						</ul>
					</li>
					<li class="treeview" @click="goPage('3')" v-if="usertp != '1'">
						<a href="javascript:;">
							<i class="fa fa-inbox"></i>
							<span>门店管理</span>
						</a>
					</li>
					<li class="treeview" @click="goPage('4')" v-if="usertp != '1'">
						<a href="javascript:;">
							<i class="fa fa-user-circle"></i>
							<span>员工管理</span>
						</a>
					</li>
					<li class="treeview" v-if="usertp != '1'">
						<a href="javascript:;" @click="toggle(2)">
							<i class="fa fa-cog"></i>
							<span>提成配置</span>
						</a>
						<ul class="inner-menu" v-show="open2">
							<li class="active">
								<router-link :to="{name:'configDex',params: {num: '1'}}" tag="a">店员</router-link>
								<router-link :to="{name:'configDex',params: {num: '2'}}" tag="a">店铺</router-link>
								<!--<router-link :to="{name:'configDex',params: {num: '3'}}" tag="a">销售主管</router-link>-->
								<router-link :to="{name:'configDex',params: {num: '4'}}" tag="a">城市经理</router-link>
								<router-link :to="{name:'configDex',params: {num: '5'}}" tag="a">大区经理</router-link>
							</li>
						</ul>
					</li>
					<li class="treeview" @click="goPage('5')" v-if="usertp != '1'">
						<a href="javascript:;">
							<i class="fa fa-pencil-square"></i>
							<span>退订流水</span>
						</a>
					</li>
				</ul>				
			</section>
		</aside>
		<loading :list="data" :loading="loading" :resultCode="resultCode"></loading>
		<!---- Left sidebar end ---->
		<!-- Main content -->
		<div class="content-wrapper">			
			<router-view></router-view>
		</div>
	</div>
</template>
<script>	
	import loading from './loading.vue'	
	export default {
		name: '',
		props: ['list'],
		data () {
		  	return {
		  		userName: '',
				userType: '',
				open1: false,
				open2: false,
				showWsList:false,
				usertp: '',
				data:'',
				loading:false,
            	resultCode:200
			}
		  },
		created: function(){
			var that = this;
			that.userName = JSON.parse(sessionStorage.userInfo)[0].employeeName;
			that.usertp = JSON.parse(sessionStorage.userInfo)[0].type;
			if(that.usertp ==1){				
				that.userType = '普通员工';
			}else if(that.usertp ==2){
				that.userType = '销售主管';
			}else if(that.usertp ==3){
				that.userType = '店长';
			}else if(that.usertp ==4){
				that.userType = '城市经理';
			}else if(that.usertp ==5){
				that.userType = '大区经理';
			}else if(that.usertp ==6){
				that.userType = '零售助理';
			}else if(that.usertp ==0){
				that.userType = '管理员';
			}
		},
		computed: {
		    isFolder: function () {
		      return this.props	       
		    }
		  },
		methods: {
			goHome(){
		  		this.$router.push({
		  			name: 'Home'
		  		});
			 },
			exitLogin(){
				this.$router.push({
		  			name: 'Login'
		  		});
		  		sessionStorage.userInfo = '';
			},
			goPage(type) {
				var that = this;
				that.usertp = JSON.parse(sessionStorage.userInfo)[0].type;
				that.open = false		
				if(that.usertp == '1'){
					that.$router.push({
						name: 'GuideDetail',
						params: {}
					});
				}else{									
					if(type=="1"){
						//管理首页
						that.$router.push({
							name: 'IndexMgt',
							params: {}
						});
					}else if(type=="2"){
						//绩效查询
						that.$router.push({
							name: 'JxQuery',
							params: {}
						});
					}else if(type=="3"){
						//门店查询
						that.$router.push({
							name: 'StoreInquiry',
							params: {}
						});
					}else if(type=="4"){
						//员工查询
						that.$router.push({
							name: 'StaffInquiry',
							params: {}
						});
					}else if(type=="5"){
						//退订流水
						that.$router.push({
							name: 'unsubscribeList',
							params: {}
						});
					}else if(type=="10"){
						//门店查询
						that.$router.push({
							name: 'dzJxQuery',
							params: {}
						});
					}
				}
			},    
			toggle: function (index) {
				if(index==1){
		        	this.open1 = !this.open1
				}else if(index==2){
		        	this.open2 = !this.open2
				}
		   }		
		},
		components: {
			loading
		}
	}
	//菜单选中状态
	$(function () {	
		//一级菜单
	    $('.sidebar-menu').children('.treeview').click(function(){
	        $(this).addClass('active').siblings().removeClass('active');
	  	});
	  	//二级菜单
	  	$('.inner-menu').find('a').click(function() {
			$('.inner-menu').find('a').removeClass('active');
			$(this).addClass('active');
		});
	})
</script>

<style scoped>
	.wsList{
		position:absolute;
		top:51px;
		right:0;
		min-height:300px;
		background:#44515d;
		width:300px;
		height:500px;
		overflow-y:scroll;
		text-align:left;
		color:#fff;
		padding:5px 15px;
		opacity:0;
		animation:showList 0.5s ease-out 0s forwards;
		border: 3px solid #ccc;
	}
	.wsList span{
		display: block;
		line-height: 25px;
		white-space: pre-wrap;
		word-wrap: break-word;
	}
	.wsTip{
		position: sticky;
		text-align: center;
		letter-spacing: .8em;
		font-size: 10px;
		width: 220px;
		bottom: 0;
		left: 40px;
		margin-bottom: 5px;
		color: #fff67f;
	}
    @keyframes showList{
        form{
            opacity:0;
        }
        to{
            opacity:0.7;
        }
    }	
</style>