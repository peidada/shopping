import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index';
import allShopping from '@/components/allShopping';
import shoppingCart from '@/components/shoppingCart';
import mine from '@/components/mine';
import shoppingDetail from '@/components/shoppingDetail';
import detailMain from '@/components/detailMain';

/* 使用路由依赖 */
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', //首页
      name: 'index',
      component: index
    },
    {
      path: '/allShopping', //全部商品
      name: 'allShopping',
      component: allShopping
    },
    {
      path: '/shoppingCart', //购物车
      name: 'shoppingCart',
      component: shoppingCart
    },
    {
      path: '/mine', //我的订单
      name: 'mine',
      component: mine
    },
    {
      path: '/shoppingDetail', //商品详情
      name: 'shoppingDetail',
      component: shoppingDetail
    },
    {
      path: '/detailMain', //商品详情
      name: 'detailMain',
      component: detailMain
    },
  ]
})
