<template>
	<div class="inquiry-wrapper">
		<div class="inquiry-top container-fluid">
			<div class="row mgb10">
				<div class="col-md-3">
					<!--<label>员工类型：</label>
					<select v-model="param.type">
						<option value="">全部</option>
						<option value="1">员工</option>
						<option value="2">销售主管</option>
						<option value="3">店长</option>
					</select>-->
					<label>时间：</label>
					<input type="month" v-model="param.time" />
				</div>
				<div class="col-md-3">
					<label>员工编号：</label>
					<input type="text" v-model="param.employeeNum" />
				</div>
				<div class="col-md-3">
					<label>员工姓名：</label>
					<input type="text" v-model="param.employeeName" />
				</div>
				<div class="col-md-3">
					<button type="button" class="btn btn-primary" @click="refresh">查询</button>
				</div>
			</div>
			<!--<div class="row">
				<div class="col-md-3">
					<label>门店：</label>
					<select v-model="param.storeId">
						<option value="" selected="selected">不限</option>
						<option v-for="store in stores" :value="store.storeNum">{{store.storeName}}</option>
					</select>
				</div>
				<div class="col-md-4">
					<label>销售额范围：</label>
					<input class="min_input" type="text" name="" />
					<span>--</span>
					<input class="min_input" type="text" name="" />
				</div>
			</div>
				-->
		</div>
		<div class="col-md-12">
			<div class="col-md-12 pb10">
				<span class="fn-left mgt5">查询结果（{{counts}}）</span>
				<button class="btn btn-primary fn-right" @click="exportList">导出数据</button>
				<button v-if="this.param.employeeType!=''" class="btn btn-primary fn-right mgr10" type="button" @click="download">模板下载</button>
				<form id="formid" v-if="this.param.employeeType!=''">
					<button class="btn btn-primary fn-right mgr10" type="button">导入数据</button>
					<input class="btn fn-right mgr10 opacityHide" type="file" id="resource" name="resource" ref="resource" @change="upload($event)">
				</form>
				<!--<a class="btn btn-primary fn-right" href="http://10.0.17.212/citymanager/exportManagerSalary?jsonObject={'type':1}">导出数据</a>-->
				<!--<router-link class="btn btn-primary fn-right" :to="{path: dataurl, query: {jsonObject: JSON.stringify(param)}}" tag="a">导出数据</router-link>-->
			</div>
			<div class="col-md-12 ofxscroll">
				<table class="table table-bordered normall-table table-hover" width="100%">
				    <tr>
				      <th>绩效时间</th>
				      <th>员工编号</th>
				      <th>员工姓名</th>
				      <th>所在店铺</th>
				      <th>店铺编号</th>
				      <th>店铺大区</th>
				      <th>提成薪资</th>
				      <th>管辖的店铺名称</th>
				      <th>管辖的店铺编号</th>
				      <th>管辖的店铺管理模式</th>
				      <th>管辖的店铺大区</th>
				      <th>管辖的店铺城市</th>
				      <th>管辖的店铺月销售额</th>
				      <th>管辖的月提成系数</th>
				      <th>管辖的月提成</th>
				    </tr>
					<tbody v-for="list,index in lists">
						<tr v-for="value,i in list.storeCountList">
							<td v-if="i==0" :rowspan="list.storeCountList.length">{{list.time}}</td>
							<td v-if="i==0" :rowspan="list.storeCountList.length">{{list.employeeNum}}</td>
							<td v-if="i==0" :rowspan="list.storeCountList.length">{{list.employeeName}}</td>
							<td v-if="i==0" :rowspan="list.storeCountList.length">{{list.storeName}}</td>
							<td v-if="i==0" :rowspan="list.storeCountList.length">{{list.storeId}}</td>
							<td v-if="i==0" :rowspan="list.storeCountList.length">{{list.areaName}}</td>
							<td v-if="i==0" :rowspan="list.storeCountList.length">{{list.ownerCount}}</td>
							<td>{{lists[index].storeCountList[i].storeName2}}</td>
							<td>{{lists[index].storeCountList[i].storeNum}}</td>
							<td>{{lists[index].storeCountList[i].storeType}}</td>
							<td>{{lists[index].storeCountList[i].areaName2}}</td>
							<td>{{lists[index].storeCountList[i].cs}}</td>
							<td>{{lists[index].storeCountList[i].salesCount}}</td>
							<td>{{lists[index].storeCountList[i].ratio}}</td>
							<td>{{lists[index].storeCountList[i].salary}}</td>
						</tr>
					</tbody>
				</table>
				<!--分页-->
				<div v-show='counts>0'>
					<button class="btn btn-default fn-left" @click="refresh">刷新</button>
					<boot-page ref="page" :async="true" :data="lists" :len="10" :url="url" :page-len="pageLen" :param="param" v-on:listenToChildEvent="showMsgFormChild"></boot-page>								
				</div>
				<!--/分页-->	
								
			</div>
		</div>
	</div>
</template>
<style>
	.urlStyle{
		color: #0ae;
	    border: 1px solid;
	    border-radius: 4px;
	    padding: 3px 10px
	}
	.ofxscroll{
		overflow-x: scroll;
	}
	.table tbody tr td{
		vertical-align:middle;
	}
	table th{
		padding: 0 5px;
		white-space: nowrap;
	}
	table td{
		white-space: nowrap;
	}
	body,table{
		font-size:12px;
	}
	table{
         empty-cells:show; 
         border-collapse: collapse;
         margin:0 auto;
	}
	.opacityHide{
		opacity: 0;
	}
	#formid{
		position:relative;
		overflow:hidden;
	}
	#formid input{
		position:absolute;
		right:0;
		top:0;
	}
</style>
<script>
import bootPage from '../pagination.vue'
	export default {
		name: '',
		data() {
			return {
				counts: '',
				lenArr: [10], // 每页显示长度设置
	            pageLen: 10, // 可显示的分页数
	            url: 'http://dvtest.qineasy.com:8888/salesCount/getOwnerCountList', // 请求路径
				param: {
					employeeType:"",
				 	time: '',
	            	employeeNum: '',
					employeeName: '',
					nub: '0',
					size: '5'
	            }, // 传递参数	            
	            stores:[],
				file:null,
	            lists: [], // 分页组件传回的分页后数据 
	            dataurl: 'http://dvtest.qineasy.com:8888/excel/exportOwnerExcel' // 导出数据地址
			}
		},
		created(){
			this.getNum()
			this.$nextTick(() => {
	       		this.refresh()	        
	      	})	
			this.getStores()
			this.param.time=this.getdate().year+'-'+this.getdate().month
		},
		watch: {
			'$route' (to, from){
				this.getNum()
				this.refresh()
		    }
		},		
		components: {
	        bootPage
	  	},
		methods: {
			//下载模板
			download(){
				var that = this;
				window.open('http://dvtest.qineasy.com:8888/excel/exportMouldExcel?jsonObject=');
			},
			upload(event){
				var that=this
				var formData = new FormData() // FormData 对象
				formData.append('file', this.$refs.resource.files[0])
				formData.append('jsonObject', JSON.stringify(Number(this.$route.params.num)))
				this.$http.post('http://dvtest.qineasy.com:8888/excel/ownerImport', formData, {
					method: 'post',
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					transformRequest: [function (data) {
						return data
					}],
					onUploadProgress: function(e) {
						let percentage = Math.round((e.loaded * 100) / e.total) || 0
						console.log(e, percentage)
					}
				}).then((response) => {
					if (response.data.status) {
						setTimeout(function(){
							location.reload();
						},500)
					} else {
						this.$Notice.error({
							title: '错误',
							message: response.data.imgId
						})
					}
				}).catch(function (error) {
					console.log(error)
				})				
			},				
			getdate (){
				let obj;
				var data = new Date();
				let month = data.getMonth()+1;
				let year = data.getFullYear();
				if(month<10){
					month = '0'+ month
				}else{
					month = month
				}
				obj = {
					year: year,
					month: month
				}
				return obj
			},
			getNum(){
				if(this.$route.params.num=="1"||this.$route.params.num=="2"){
					this.param.employeeType=this.$route.params.num
				}else{
					this.param.employeeType=''
				}
			},
			refresh () {
           		var that = this;
	            that.$refs.page.refresh()
	        },
	        showMsgFormChild: function(data){	
	            this.lists = data.ownerCountList;
	            this.counts = data.count;
			},
			//查询门店
			getStores(){
				var that = this;
				that.$axios({
                    url: 'http://dvtest.qineasy.com:8888/store/getStoreList', 
                    method: 'get',
                    params: {
                    	jsonObject: {}
                    }
                })
				.then(function (response) {
			        that.stores = response.data.t.storeList
			    })
			      .catch(function (error) {
			        console.info(error)
			    })
			},
			//导出数据
			exportList(){
				var that = this;
				window.open(that.dataurl+'?jsonObject='+JSON.stringify(that.param));
			}
		},	
		events: {
	        // 刷新数据
	        'refresh' () {
	            this.refresh()
	        }
	    }
	}
</script>
