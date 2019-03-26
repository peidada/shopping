<template>
  <div>
    <span>我是全部商品页</span>
    <van-tabbar v-model="active" @change="tabbarChange">
      <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item icon="shop-o">全部商品</van-tabbar-item>
      <van-tabbar-item icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的订单</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Search, Tabbar, TabbarItem } from 'vant';

export default {
  data() {
    return{
      active: 2,
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Search.name]: Search,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  methods: {
    /* 点击页面底部tabbar */
    tabbarChange(e){
      this.tabbarRouter(e);
    },
    /* 通过判断不同的值去跳转不同的路由 */
    tabbarRouter(data){
      switch(data){
        case 0:
          this.$router.push({path: '/'});
          break;
        case 1:
          this.$router.push({path: '/mine'});
          break;
        case 2:
          this.$router.push({path: '/allShopping'});
          break;
        case 3:
          this.$router.push({path: '/shoppingCart'});
          break;
      }
    }
  },
}
</script>

<style lang="less" scoped>

</style>
