<template>
    <div>
        <h3>图片列表</h3>

        
    </div>
</template>
<script>
   import mui from '../../lib/mui/js/mui.min.js';
   

   export default{
     data(){
        return {
            cates:[],//所有分类的列表数组
            list:[]//图片列表的数组

        }
     },
     created(){
        this.getAllCategory();
        //默认进入页面，就主动请求所有图片列表的数据
        this.getPhotoListByCateId(0);
     },
     mounted(){
        //当组件中的DOM结构被渲染好并放到页面中，会折行这个钩子函数
        //如果要操作元素，最好在mounted里面，因为这时的DOM元素是最新的
        mui('.mui-scroll-wrapper').scroll({
           deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
     },
     methods:{
        getAllCategory(){
            //获取所有的图片分类
            this.$http.get('api/getimgcategory').then(result=>{
                if(result.body.status === 0){
                    //手动拼接出一个最完整的分类列表
                    result.body.message.unshift({title:'全部',id:0});
                    this.cates = result.body.message;
                }
            });
        },
        getPhotoListByCateId(cateId){
            //根据分类id获取图片列表
            this.$http.get('api/getimages/'+cateId).then(result=>{
                if(result.body.status===0){
                    this.list = result.body.message;
                }
            })
        }
     } 
   }
</script>
<style lang="scss" scoped>
	
</style>