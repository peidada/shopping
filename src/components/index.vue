<template>
  <div class="index">
    <van-swipe :autoplay="3000" class="index-swipe">
      <van-swipe-item v-for="(thumb,index) in swipeItems" :key="index">
        <img :src="thumb.thumb">
      </van-swipe-item>
    </van-swipe>
    <van-search placeholder="搜索商品" v-model="searchShop" />
    <img v-for="(img,index) in imageList" :key="index" :src="img" class="img">
    <van-row class="shoppings">
      <van-col span="11" v-for="(items, index) in shopList" :key="index" @click.native="shopDetailClick(items)">
        <div class="shop-img"></div>
        <div class="shop-name">{{items.name}}</div>
        <div class="shop-price">￥{{items.price}}</div>
        <van-icon name="cart-circle-o" class="shop-icon"/>
      </van-col>
    </van-row>
    <van-tabbar v-model="active" @change="tabbarChange">
      <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item icon="shop-o">全部商品</van-tabbar-item>
      <van-tabbar-item icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的订单</van-tabbar-item>
    </van-tabbar>
    <div class="tab-bottom"></div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Search, Tabbar, TabbarItem, Lazyload, Row, Col, Icon } from 'vant';
import { axiosGet, axiosPost } from '../request/http';
import { get_prod_detail, get_prodlist } from '../request/api';
export default {
  name: 'index',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Search.name]: Search,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
  },
  data () {
    return {
      swipeItems: [
        {thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg'},
        {thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'},
        {thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg'},
        {thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'},
      ],
      searchShop: '',
      active: 0,
      imageList: [
        'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
        'https://img.yzcdn.cn/2.jpg',
        'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
        'https://img.yzcdn.cn/2.jpg',
        'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
        'https://img.yzcdn.cn/2.jpg',
        'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
        'https://img.yzcdn.cn/2.jpg',
      ],
      shopList: [],
    }
  },
  created() {
    this.shoppingList();
    // this.shoppingDetail();
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
    },
    /* 商品列表 */
    shoppingList(){
      axiosPost(`/api` + get_prodlist, {
        type2:'普通商品',
      }).then(res => {
        console.log(res);
        this.shopList = res;
      }).catch(err => {})
    },
    /* 商品详情 */
    // shoppingDetail(){
    //   axiosPost(`/api` + get_prod_detail, {
    //     item_id: '453482848'
    //   }).then(res => {
    //     console.log(res);
    //   }).catch(err => {})
    // },
    shopDetailClick(items){
      console.log(222);
      this.$router.push({
        path: '/shoppingDetail'
      })
    }
  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .index{
    &-swipe{
      height: 200px;
      img{
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .img{
      width: 92%;
      height: 200px;
      margin-left: 4%;
      margin-bottom: 10px;
      border-radius: 10px;
    }
    .tab-bottom{
      width: 100%;
      height: 50px;
      background: white;
    }
    .shoppings{
      width: 100%;
      height: auto;
      background: #f5f6f7;
      padding-bottom: 1rem;
      .van-col{
        background: #fff;
        height: 16.25rem;
        margin-left: .6875rem;
        margin-top: 1rem;
        position: relative;
        .shop-img{
          width: 100%;
          height: 10.88rem;
          background:#777;
        }
        .shop-name{
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          overflow:hidden;
          -webkit-box-orient: vertical;
          font-size: .88rem;
          width: 86%;
          margin: 0 auto;
          height: 2.5rem;
          margin-top: .5rem;
        }
        .shop-price{
          color: red;
          font-size: .88rem;
          margin-top: .5rem;
          margin-left: .75rem;
        }
        .shop-icon{
          color: red;
          position: absolute;
          bottom: .7rem;
          right: .75rem;
          font-size: 1.2rem;
        }
      }
    }
  }
</style>

