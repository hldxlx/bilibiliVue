<template>
  <div>
    <transtion
       @before-enter="beforeEnter"
       @enter="enter"
       @after-enter="afterEnter">

      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transtion>

    <numbox @getcount="getSelectedCount" :max="mm"></numbox>


    
    <p>id:22</p>
    <p>价格100</p>

    <button @click="addToShopCar">加入购物车</button>

    <!--加入购物车按钮属于goodsInfo组件,数字属于numbox组件;
      由于涉及到父子组件的嵌套，所以无法直接在goodsInfo组件获取选中的商品数量值；
      怎么解决：涉及到了子组件向父组件传值(事件调用机制)；
      事件调用的本质：父向子传递方法，子调用这个方法，同时把数据当做参数传递给这个方法
    -->

    <!--分析：子组件何时把数据传递给父组件-->


    <p>vuex demo</p>
    <demo></demo>


    <div class="goods-list">
      <div class="mui-card-header mui-card-media">
        <div class="mui-media-body">
            <mt-switch 
            v-model="$store.getters.getGoodsSelected[2]"
            @change="selectedChanged(2,$store.getters.getGoodsSelected[2])"
            ></mt-switch>
            <img class="kury" src="../../images/ball.jpg">
            <div class="info">
                <span>小米</span>
                <shopcarNumbox></shopcarNumbox>
                <span class="price">2199</span>
                <span>删除</span>
                <p>已勾选{{$store.getters.getGoodsCountAndAmount.count}}件</p>
                <p>总价{{$store.getters.getGoodsCountAndAmount.amount}}元</p>
            </div>
          
        </div>
      </div>
    </div>

    <p>{{$store.getters.getGoodsSelected}}</p>

    </div>
</template>

<script>
    import numbox from '../subcomponents/numbox.vue';
    import demo from '../subcomponents/demo.vue';
    import shopcarNumbox from '../subcomponents/shopcar_numbox.vue';

    export default {
       data(){
          return{
            ballFlag:false,//控制小球隐藏显示
            selectedCount:1,
            mm:60//先写死一个mm，其实它应该通过接口的数据获得
          }
        },
        methods:{
          addToShopCar(){
            this.ballFlag = !this.ballFlag;
            //{id:商品的id,count:数量，price:单价，selected:false}
            //拼接出一个，要保存到store中car数组的商品信息对象
          
            var goodsinfo = {
              id:2,
              count:10,
              price:299,
              selected:true
            };

            //调用store中的mutations来将商品加入购物车
            this.$store.commit("addToCar",goodsinfo);



          },
          beforeEnter(el){
            el.style.transform="translate(0px,0px)";

          },
          enter(el,done){ 
            el.offsetWidth;

            //小球动画优化思路
            //先分析导致动画不准确的 本质原因：我们把小球最终位移到的位置，已经局限
            //在了某一分辨率下的滚动条未滚动的情况下。
            //2 只要分辨率和测试时不一样，或者滚动条有一定的滚动距离之后，问题就出现了
            //3 因此，我们经过分析，得到结论:不能把位移的距离写死,
            //而是应该根据不同的情况，动态计算这个坐标值



            //获取小球在页面中的位置
            // const ballPosition = this.$refs.ball.getBoundingClientRect();

            // //获取微标在页面中的位置
            // const badgePosition = document
            // .getElementById("badge")
            // .getBoundingClientRect();
            // console.log(badgePosition,'===badgePosition');

            // const xDist = badgePosition.left - ballPosition.left;
            // const yDist = badgePosition.top - ballPosition.top;


            // el.style.transform="translate(248px,430px)";
            // el.style.transform=`translate(${xDist}px,${yDist}px)`;
            // el.style.transtiton = "all 1s ease";
            // done();//done代表afterEnter这个函数的运用
          },
          afterEnter(el){

            this.ballFlag = !this.ballFlag;
          },
          getSelectedCount(count){
            //当子组件把选中的数量传递给父组件时,把选中的值保存到data上
            this.selectedCount = count;
            console.log("父组件拿到的数量值为"+this.selectedCount);
          },
          selectedChanged(id,val){
            //每当点击开关，把最新的开关状态，同步到store中
            console.log(id+'----'+val);
            this.$store.commit('updateGoodsSelected',{id,selected:val})
          }


        },
        components:{
          numbox,
          demo,
          shopcarNumbox
        }
    }
</script>
<style lang="scss" scoped>
  .ball{
    width:15px;
    height:15px;
    background:red;
    border-radius:50%;
    position:absolute;  
    z-index:99;
    transform:translate(148px,230px);

  }
  .kury{
    width:50px;
    height:50px;
  }
</style>