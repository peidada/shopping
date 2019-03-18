<template>
  <div class="index">
    <van-swipe :autoplay="3000" class="index-swipe">
      <van-swipe-item v-for="(thumb,index) in swipeItems" :key="index">
        <img :src="thumb.thumb">
      </van-swipe-item>
    </van-swipe>
    <van-search placeholder="搜索商品" v-model="searchShop" />
    <img v-for="(img,index) in imageList" :key="index" :src="img" class="img">
    <van-tabbar v-model="active" @change="tabbarChange">
      <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item icon="shop-o">全部商品</van-tabbar-item>
      <van-tabbar-item icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的订单</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Search, Tabbar, TabbarItem, Lazyload } from 'vant';
import { axiosGet } from '../request/http';
import { hotCity } from '../request/api';
export default {
  name: 'index',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Search.name]: Search,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
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
      ]
    }
  },
  created() {
    axiosGet(hotCity, {}).then(res => {
      console.log(res);
    }).catch(res => {

    });
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
      width: 100%;
      height: 200px;
    }
  }
</style>

