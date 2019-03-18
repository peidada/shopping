<template>
  <div>
    <img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png">
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" />
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="records" />
        待接单
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" />
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        已发货
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link />
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="points" title="我的积分" is-link />
      <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
      <van-cell icon="gift-o" title="我收到的礼物" is-link />
    </van-cell-group>
    <van-tabbar v-model="active" @change="tabbarChange">
      <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item icon="shop-o">全部商品</van-tabbar-item>
      <van-tabbar-item icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的订单</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Search, Tabbar, TabbarItem, Row, Col, Icon, Cell, CellGroup } from 'vant';

export default {
  data() {
    return{
      active: 3,
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Search.name]: Search,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
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
          this.$router.push({path: '/allShopping'});
          break;
        case 2:
          this.$router.push({path: '/shoppingCart'});
          break;
        case 3:
          this.$router.push({path: '/mine'});
          break;
      }
    }
  },
}
</script>

<style lang="less" scoped>
.user {
  &-poster {
    width: 100%;
    display: block;
  }
  &-group {
    margin-bottom: 15px;
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
