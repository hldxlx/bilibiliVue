<template>
    <div>
        <h3>newsList</h3>

        <ul class="mui-table-view">
           <!--  <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <a href="javascript:;">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>能和心爱的人一起睡觉，是件幸福的事情；</span>
                            <span>时间{{item.add_time | dateFormat('YYYY-MM-DD')}}</span>
                        </p>
                    </div>
                </a>
            </li> -->

        <li class="mui-table-view-cell mui-media">
            <router-link :to="'/home/newsinfo/'+13">
                <img class="mui-media-object mui-pull-left" src="../../images/shuijiao.jpg">
                <div class="mui-media-body">
                    幸福
                    <p class='mui-ellipsis'>
                        <span>能和心爱的人一起睡觉，是件幸福的事情；</span>
                        <span>2019</span>
                    </p>
                </div>
            </router-link>
        </li>
        <!-- <li class="mui-table-view-cell mui-media">
            <a href="javascript:;">
                <img class="mui-media-object mui-pull-left" src="../../images/shuijiao.jpg">
                <div class="mui-media-body">
                    木屋
                    <p class='mui-ellipsis'>想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.</p>
                </div>
            </a>
        </li>
        <li class="mui-table-view-cell mui-media">
            <a href="javascript:;">
                <img class="mui-media-object mui-pull-left" src="../../images/shuijiao.jpg">
                <div class="mui-media-body">
                    CBD
                    <p class='mui-ellipsis'>烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
                </div>
            </a>
        </li> -->
    </ul>
    


    </div>
</template>
<script>
    import {Toast} from "mint-ui";
	export default{
        data(){
            return {
                newsList:[]//新闻数组
            }
        },
        created(){
            this.getNewsList();
        },
        methods:{
            getNewsList(){//获取新闻列表
                this.$http.get('api/getnewslist').then(result=>{
                    if(result.body.status === 0){
                        //如果没失败，应该把数据保存在data上
                        this.newsList = result.body.message;
                    }else{
                        Toast("获取失败")

                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
	.mui-ellipsis{
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
</style>