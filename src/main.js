// 入口文件
import Vue from 'vue';
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
import {Header,Swipe, SwipeItem,Button} from 'mint-ui'; 	
Vue.component(Header.name,Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

//1.3 导入自己的router.js路由模块
import router from './router.js';


//导入App根组件
import app from './App.vue';
var vm = new Vue({
    el:'#app',
    render:c=>c(app),
    router//1.4挂载路由对象到vm实例上

})
