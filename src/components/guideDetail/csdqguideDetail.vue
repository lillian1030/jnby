<template>
	<div class="guideDetail-wrapper">
		<div class="col-md-12 pd10">
			<div class="col-md-3">
				<span class="am-ft-24">{{lastInfo.name}}管辖店铺</span>
			</div>
			<div class="col-md-3">
				<p class="mgb0 am-ft-14">大区/城市</p>
				<p class="am-ft-black">
					<span class="am-ft-24">{{lastInfo.storeArea}}</span>
					<span class="am-ft-24">/</span>
					<span class="am-ft-24">{{lastInfo.storeCity}}</span>
				</p>
			</div>
			<div class="col-md-3">
				<p class="mgb0">店铺数</p>
				<p class="am-ft-black">
					<span class="am-ft-24">{{counts}}</span>
				</p>
			</div>
			<div class="col-md-3">
				<p class="mgb0">总销售数</p>
				<p class="am-ft-black">
					<span class="am-ft-14">￥</span>
					<span class="am-ft-24">{{lastInfo.storeSales}}</span>
				</p>
			</div>
		</div>
		<div class="col-md-12">
		<!--	<div class="col-md-12 pb10">
				<span class="fn-left">本月销售订单({{counts}})</span>
			</div>
		-->
			<div class="col-md-12 pb10">
				<button class="btn btn-primary fn-right" @click="exportList">导出数据</button>
			</div>
			<div class="col-md-12">
				<table class="table table-hover normall-table table-bordered guideDetail-table">
				    <tr>
				      <th scope="col">绩效期间</th>
				      <th scope="col">工号</th>
				      <th scope="col">姓名</th>
				      <th scope="col">城市</th>
				      <th scope="col">品牌</th>
				      <th scope="col">店铺编号</th>
				      <th scope="col">店铺名称</th>
				      <th scope="col">月销售量</th>
				      <th scope="col">月指标额</th>
				      <th scope="col">完成率</th>
				    </tr>
				    <tr v-for="list in lists">
				      <td>{{list.year}}-{{list.month}}</td>
				      <td>{{list.jobCode}}</td>
				      <td>{{list.name}}</td>
				      <td>{{list.storeCity}}</td>
				      <td>{{list.storeBrand}}</td>
				      <td>{{list.storeNum}}</td>
				      <td>{{list.storeName}}</td>
				      <td>{{list.storeSales}}</td>
				      <td>{{list.storeTarget}}</td>
				      <td>{{list.completeRatio}}</td>
				    </tr>
				</table>
				<!--分页-->
				<div v-show='counts>0'>
					<button class="btn btn-default fn-left" @click="refresh">刷新</button>
					<boot-page ref="page" :async="true" :len='5' :data="lists" :lens="lenArr" :url="url" :page-len="pageLen" :param="param" v-on:listenToChildEvent="showMsgFormChild"></boot-page>								
				</div>
				<!--/分页-->	
				<div v-show="counts==0">
					<p class="text-muted am-ft-center mgt20">暂无数据</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import bootPage from '../pagination.vue'	
	export default {
		name: '',
		data() {
			return {
				counts: '',
				lenArr: [10], // 每页显示长度设置
	            pageLen:10, // 可显示的分页数
	            url: 'http://dvtest.qineasy.com:8888/citymanager/getManagerSalesList', // 请求路径
				param: { //员工详情入参
					type: '',
		        	nub:'0',
		        	name:'',
		        	size:'10'
		        },
				lastInfo:null,
		        lists: [], // 分页组件传回的分页后数据 
				dataurl: 'http://dvtest.qineasy.com:8888/citymanager/exportManagerSalesList' // 导出数据地址
			}
		},
		created(){
			this.$nextTick(() => {
	       	 this.refresh()	        
	      	})	
			this.lastInfo=this.$route.query
			if(this.$route.query.type==1){
				this.param.storeCity=this.$route.query.storeCity
				this.param.type=this.$route.query.type
				this.param.name=this.$route.query.name
				this.param.storeArea=this.$route.query.storeArea
				this.param.storeBrand=this.$route.query.storeBrand
			}else if(this.lastInfo.type==2){
				this.param.storeArea=this.$route.query.storeArea
				this.param.type=this.$route.query.type
				this.param.name=this.$route.query.name
			}
		},
		components: {
	        bootPage
	  	},
		methods: {	
		  	refresh () {
           		var that = this;
	            that.$refs.page.refresh()
	        },
	        showMsgFormChild: function(data){
				console.log(data)
	        	  this.lists = data.list;	
			      this.counts = data.count;
			},
						//导出数据
			exportList(){
				var that = this;
				window.open(that.dataurl+'?jsonObject='+JSON.stringify(that.param));
			},
		},
		events: {
	        // 刷新数据
	        'refresh' () {
	            this.refresh()
	        }
	    }
	}
</script>
<style scoped>
	.guideDetail-nav{
		background: #F4F4F4;
	    padding-top: 10px;
	    padding-bottom: 10px
	}
	.guideDetail-table tr th,.guideDetail-table tr td{
		text-align: center;
	}
	.guideDetail-son-table tr td{
		padding-top: 7px;
	}
	.guideDetail-son-table{
		margin-bottom: 10px;
	}
	.order-nav{
		background: #f4f4f4;
   		color: #666;
	    padding: 7px;
	}
	.queryBtn{
		padding-top: 4px;
	}
	.queryBtn a{
		padding: 5px 10px;
	    border: 1px solid #aaa;
	    border-radius: 4px;
	    color: #666;
	}
</style>