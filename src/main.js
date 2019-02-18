// 入口文件
import Vue from 'vue';

//配置vuex的步骤
//1 运行 cnpm i vuex -S
//2 导包
import Vuex from 'vuex';
//3注册vuex到vue中
Vue.use(Vuex);

//每次刚进入网站，肯定会调用main.js，在刚调用时，先从本地存储中，把购物车的数据读出来，放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]');
//4 new Vuex.Store()实例，得到一个数据仓储对象
var store = new Vuex.Store({
	state:{
		//可以把state想象成组件中的data,专门用来存储数据的
		//如果在组件中,想要访问store中的数据，只能通过this.$store.state.***来访问

		count:0,
		car:car//将购物车中商品的数据用一个数组存储起来，在car数组中，存储一些商品的对象，
		//咱们可以暂时将这个商品对象，设计成这样{id:商品的id,count:数量，price:单价，selected:false}

	},
	mutations:{
		//注意：如果要操作store 中的state值，只能通过调用mutations提供的方法才能操作对应的数据，
		//不推荐直接操作state中的数据，因为万一导致了数据的紊乱，不能快速定位到错误原因，因为每个组件都
		//可能有操作数据的方法
		increment(state){
			state.count++
		},
		//注意：如果组件想要调用mutations中的方法，只能使用this.$store.commit("方法名")
		//这种调用mutations方法的格式，和this.$emit("父组件中的方法名")类似
		subtract(state,obj){
			//注意：mutations的函数参数列表中，最多支持两个参数，其中
			//参数1：是state状态；参数2：通过commit提交过来的参数；
			console.log(obj.d);
			state.count-=(obj.c+obj.d);
		},
		addToCar(state,goodsinfo){
			console.log(state.car,'===state.car')

			//点击加入购物车，把商品信息，保存到store中的car上
			//分析：
			//1 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
			//2 如果没有，则直接把商品的数据，push到car中即可
			//假设在购物车中，没有找到对应的商品
			var flag = false;
			state.car.some(item=>{
				if(item.id == goodsinfo.id){
					item.count += parseInt(goodsinfo.count);
					flag = true;
					return true;
				}
			})


			//如果最终,循环完毕，得到的flag还是false,则把商品数据push到car中
			if(!flag){
				state.car.push(goodsinfo);
			}

			//当更新car之后，把car数组，存储到本地的localStorage中
			localStorage.setItem('car',JSON.stringify(state.car));



		},
		updateGoodsSelected(state,info){
			state.car.some(item=>{
				if(item.id == info.id){
					item.selected = info.selected;
				}
			})

			//把最新的所有购物车的状态保存到store中去
			localStorage.setItem('car',JSON.stringify(state.car));
		} 


	},
	getters:{
		//注意：这里的getters只负责对外提供数据，不负责修改数据,如果想要修改
		//state中的数据，请去找mutations
		optCount:function(state){
			return '当前最新的count值是：'+state.count
		},
		//回顾对比，发现getters中的方法和组件中的过滤器比较类似，因为过滤器和getters都
		//没有修改原数据，都是把原数据做了一层包装，提供给了调用者；
		//其次，getters也和computed比较像，只要state中的数据发生变化了，那么，
		//如果getters正好也引用了这个数据，那么就会立即触发	getters的重新求值；
		getAllCount(state){
			var c = 0;
			state.car.forEach(item=>{
				c+=item.count
			});
			return c;
		},
		getGoodsSelected(state){
			var o = {};
			state.car.forEach(item=>{
				o[item.id] = item.selected;
			})
			return o;

		},
		getGoodsCountAndAmount(state){
			var o = {
				count:0,//勾选的数量
				amount:0 //勾选的总价
			}
			state.car.forEach(item=>{
				if(item.selected){
					o.count+=item.count;
					o.amount+=item.price*item.count;
				}
			})
			return o


		}


	}
})

//总结：
//1 state中的数据不能直接修改，如果想修改，必须通过mutations
//2 如果组件想要直接从state上获取数据：需要 this.$store.state.***
// 3 如果组件，想要修改数据，必须使用mutations提供的方法，需要通过this.$store.commit('方法的名称',唯一的一个参数)
// 4 如果store中state上的数据，在对外提供时，需要做一层包装，那么，推荐使用getters，
//如果需要使用getters，则用this.$store.getters.***


//1.1 导入路由的包
import VueRouter from 'vue-router';
//1.2 安装路由
Vue.use(VueRouter);

//导入格式化时间的插件
import moment from 'moment';

//定义全局的过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
	return moment(dataStr).format(pattern)
});


//2.1导入vue-resource
import VueResource from 'vue-resource';
//2.2安装vue-resource

Vue.use(VueResource);
//设置请求的根路径
Vue.http.options.root = 'http://vue.studyit.io';
//全局设置post时表单数据组织形式  application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;


//导入MUI的样式
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

//按需导入Mint-UI中的组件
import {Header,Swipe, SwipeItem,Button,Switch} from 'mint-ui'; 	
Vue.component(Header.name,Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Switch.name, Switch);

//1.3 导入自己的router.js路由模块
import router from './router.js';


//导入App根组件
import app from './App.vue';
var vm = new Vue({
    el:'#app',
    render:c=>c(app),
    router,//1.4挂载路由对象到vm实例上
    store  //5将vuex创建的store挂载到VM实例上，只要挂载到了vm上，任何组件就能使用store来存储数据

})
