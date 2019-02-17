<template>
  <div>
    <div class="mui-numbox" data-numbox-step='2' data-numbox-min='0' data-numbox-max='100'>
      <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
      <input class="mui-numbox-input" type="number" value="1" @change="countChanged" ref="numbox"/>
      <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
      mounted(){
        //初始化数字选择框组件
        mui(".mui-numbox").numbox();
      },
      methods:{
        countChanged(){
          //每当文本框的数据被修改时，立即把最新的数据通过事件调用，传递给父组件
          console.log(this.$refs.numbox.value);
          this.$emit('getcount',parseInt(this.$refs.numbox.value));
        }
      } 
    }
</script>

<style lang="scss" scoped>

</style>
