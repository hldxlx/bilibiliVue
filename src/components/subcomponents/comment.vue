<template>
    <div>
        <h3>评论组件</h3>
        <textarea placeholder="请输入最多100字" maxlength="100" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
         <div class="cmt-list" v-for="item in comments" :key="item.add_time ">
             
         </div>
         <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
   import {Toast} from 'mint-ui';
   // export default{
   //      data(){
   //          return {
   //              pageIndex:1,//默认展示第一页数据
   //              comments:[],//所有评论数据
   //              msg:''//评论输入的内容
   //          }
   //      },
   //      created:{
   //          this.getComments();
   //      },
   //      methods:{
   //          getComments(){//获取评论
   //              this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result=>{
   //                  if(result.body.status ===0){
   //                      // this.comments = result.body.message;
   //                      //每当获取新评论数据时，不要把老数据清空，
   //                       this.comments = this.comments.concat(result.body.message);

   //                  }else{
   //                      Toast('获取评论失败!');
   //                  }
   //              });
   //          },
   //          getMore(){//加载更多
   //              this.pageIndex++;
   //              this.getComments();
   //          },
   //          postComment(){
   //              //校验是否为空内容
   //              if(this.msg.trim().length === 0){
   //                  return Toast('评论内容不能为空');
   //              }

   //              //发表评论
   //              //参数1:请求的url地址
   //              //参数2:提交给服务器的数据对象{content:this.msg}
   //              //参数3:定义提交时，表单数据的格式{emulateJSON:true}

   //              this.$http.post('api/postcomment/'+th$route.params.id,{content:this.msg.trim()})
   //              .then(function(result){
   //                  if(result.body.status ===0){
   //                      //1拼接出一个评论对象
   //                      var cmt = {
   //                          user_name:'匿名用户',
   //                          add_time:Date.now(),
   //                          content:this.msg.trim()
   //                      };
   //                      this.comments.unshift(cmt);
   //                      this.msg = "";
   //                  }
   //              });
   //          }

   //      },
   //      props:["id"] 
   //  }
</script>
<style lang="scss" scoped>
	
</style>