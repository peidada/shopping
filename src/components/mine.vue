<template>
  <div>
    <div class="user-header">
      <div class="user-header-img" @click="userInfoChange">
        <img :src="userInfoData.avatarurl" alt="">
      </div>
      <p class="user-header-name">{{userInfoData.shop_username}}</p>
    </div>

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
      <!-- <van-tabbar-item icon="shop-o">全部商品</van-tabbar-item> -->
      <!-- <van-tabbar-item icon="cart-o">购物车</van-tabbar-item> -->
      <van-tabbar-item icon="manager-o">我的订单</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Search, Tabbar, TabbarItem, Row, Col, Icon, Cell, CellGroup } from 'vant';
import { axiosGet, axiosPost } from '../request/http';
import { get_userinfo, get_prodlist, get_order } from '../request/api';
export default {
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
  data() {
    return{
      active: 1,
      userInfoData: {},
    }
  },
  created() {
    this.getUserInfo();
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
    },
    /* 获取用户基本信息 */
    getUserInfo() {
      this.$store.commit('showLoading');
      axiosPost(process.env.API_HOST + get_userinfo, {}).then(res => {
        console.log(res);
        this.userInfoData = res;
        this.$store.commit('updataName', res.shop_username);
        this.$store.commit('updataPhone', res.shop_mobile);
        this.$store.commit('hideLoading');
      }).catch(err => {})
    },
    /* 更新用户信息 */
    userInfoChange() {
      this.$router.push({
        path: '/mineDetail'
      })
    },
    /* 订单列表 */
    getOrder(){
      axiosPost(process.env.API_HOST + get_order, {}
      ).then(res => {
        console.log(res);

      }).catch(err => {})
    }
  },
}
</script>

<style lang="less" scoped>
.user {
  &-header {
    width: 100%;
    height: 12.5rem;
    // background-color: turquoise;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    position: relative;
    top: 0;
    left: 0;
    &-img{
      width: 5rem;
      height: 5rem;
      background-color: #fff;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      top: 3rem;
      left: 2rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    &-name{
      position: absolute;
      left: 8.4rem;
      top: 4rem;
    }
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
