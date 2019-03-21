<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="(thumb,index) in itemData.item_imgs" :key="index">
        <img :src="thumb.url" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ itemData.title }}</div>
        <div class="goods-sell_point">{{ itemData.sell_point }}</div>
        <div class="goods-price">{{ formatPrice(itemData.price) }}</div>
        <div class="goods-origin_price">{{ itemData.origin_price }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="8" class="express-color">运费：{{ goods.express }}</van-col>
        <van-col span="8" class="express-color">剩余：{{ itemData.quantity }}</van-col>
        <van-col span="8" class="express-color">销量：{{ itemData.sold_num }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-row class="goods-express-mode">
      <van-col offset="1" span="12">配送方式：快递</van-col>
    </van-row>

    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop-o" is-link @click="linkToShop">
        <template slot="title">
          <span class="van-cell-text">玩疯了思维课堂</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="查看商品详情" is-link @click="linkToDetail" />
    </van-cell-group>

    <van-goods-action>
      <!-- <van-goods-action-mini-btn icon="chat-o" @click="sorry">
        客服
      </van-goods-action-mini-btn>
      <van-goods-action-mini-btn icon="cart-o" @click="onClickCart">
        购物车
      </van-goods-action-mini-btn>
      <van-goods-action-big-btn @click="sorry">
        加入购物车
      </van-goods-action-big-btn> -->
      <van-goods-action-big-btn primary @click="orderNow">
        立即购买
      </van-goods-action-big-btn>
    </van-goods-action>
  </div>
</template>

<script>
import {
  Tag, Row, Col, Icon, Cell, CellGroup, Swipe, Toast, SwipeItem, GoodsAction, GoodsActionBigBtn,
  GoodsActionMiniBtn
} from 'vant';
import { axiosGet, axiosPost } from '../request/http';
import { get_prod_detail, get_prodlist } from '../request/api';
export default {
  components: {
    [Tag.name]: Tag,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn
  },
  data() {
    return {
      goods: {
        express: '免运费',
        remain: 19,
      },
      id: this.$route.query.id,
      itemData: {},
    };
  },
  created() {
    this.shoppingDetail(this.id);
  },
  methods: {
    /* 金额保留2位小数 */
    formatPrice(price) {
      return '¥' + (price / 100).toFixed(2);
    },
    linkToShop() {
      // this.$router.push('cart');
    },
    linkToDetail() {
      this.$router.push({
        path: '/detailMain',
        query: {id : this.id}
      });
    },
    /* 立即购买 */
    orderNow(){

    },
    sorry() {
      Toast('暂无后续逻辑~');
    },
    /* 商品详情 */
    shoppingDetail(id){
      this.$store.commit('showLoading');
      axiosPost(`/api` + get_prod_detail, {
        item_id: id
      }).then(res => {
        console.log(res);
        this.itemData = res.response.item;
        this.$store.commit('hideLoading');
      }).catch(err => {})
    },
  }
};
</script>

<style lang="less" scoped>
.goods {
  padding-bottom: 50px;
  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }
  &-title {
    font-size: 16px;
  }
  &-sell_point{
    font-size: 14px;
    color: #999;
  }
  &-price {
    color: #f44;
  }
  &-origin_price{
    font-size: 14px;
    color: #999;
    text-decoration: line-through;
  }
  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
    .express-color{
      color: #999;
    }
  }
  &-express-mode{
    padding: 10px 0 2px 0;
    display: block;
    font-size: 14px;
  }
  &-cell-group {
    margin: 10px 0;
    .van-cell__value {
      color: #999;
    }
  }
  &-tag {
    margin-left: 5px;
  }
}
</style>