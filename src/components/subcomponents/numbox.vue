<template>
  <div>
    <!--问题：不知何时拿到max，但总归有一刻,会拿到max-->
    <!--我们可以使用watch属性监听，来监听父组件传递过来的max值，不管watch会被触发几次，
      但是，最后一次肯定是一个合法的max数值-->
    <div class="mui-numbox" data-numbox-step='2' data-numbox-min='0' :data-numbox-max='max'>
      <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
      <input class="mui-numbox-input" type="number" value="1" @change="countChanged" ref="numbox"/>
      <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>

    <div>
      <input type="button" value="减少" @click="remove">
      <input type="button" value="增加" @click="add">
      <input type="text" v-model="$store.state.count">
    </div>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
      data(){
        return {

        }
      },
      mounted(){
        //初始化数字选择框组件
        mui(".mui-numbox").numbox();
      },
      methods:{
        countChanged(){
          //每当文本框的数据被修改时，立即把最新的数据通过事件调用，传递给父组件
          console.log(this.$refs.numbox.value);
          this.$emit('getcount',parseInt(this.$refs.numbox.value));
        },
        add(){
          //千万不要这么用，不符合vuex的设计理念
          //this.$store.state.count++; 
          this.$store.commit('increment');

        },
        remove(){
          this.$store.commit('subtract',{c:3,d:1});
        }
      },
      props:["max"],
      watch:{
        //属性监听
        'max':function(newVal,oldVal){
          //使用jsAPI 设置numbox最大值
          mui(".mui-numbox").numbox().setOption('max',newVal);
        }
      } 
    }
</script>

<style lang="scss" scoped>

</style>
