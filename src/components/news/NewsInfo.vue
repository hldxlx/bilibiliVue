<template>
    <div>
        <h3>newsInfo新闻详情-------{{id}}</h3>

        <div class="content">
            <comment-box :id="this.id"></comment-box>
        </div>
    </div>
</template>
<script>
   import comment from '../subcomponents/comment.vue';
   export default{
    data(){
        return {
            id:this.$route.params.id,//讲url地址中传递过来的Id值，挂载到data上，方便调用
            newsInfo:{}
        };
    },
    methods:{
        getNewsInfo(){//获取新闻详情
            this.$http.get('api/getnew'+this.id).then(result=>{
                if(result.body.status === 0){
                    this.newsInfo = result.body.message[0];
                }else{
                    Toast("获取新闻失败");
                }
            });
        }
    },
    components:{//用来注册子组件的节点
        'comment-box':comment

    }

   }
</script>
<style lang="scss" scoped>
	
</style>