<template>
  <div class="goods" v-if="clock">
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
    
    <van-sku
      v-model="showBase"
      :sku="skuData"
      :goods="goodsData"
      :goods-id="id"
      :hide-stock="skuData.hide_stock"
      :quota="quota"
      :quota-used="quotaUsed"
      :show-add-cart-btn="showAddCartBtn"
      reset-stepper-on-hide
      @buy-clicked="onBuyClicked"
      @stepper-change="stepperChange"
    >   
    </van-sku>
  </div>
</template>

<script>
import {
  Tag, Row, Col, Icon, Cell, CellGroup, Swipe, Toast, SwipeItem, GoodsAction, GoodsActionBigBtn,
  GoodsActionMiniBtn, Sku
} from 'vant';
import { axiosGet, axiosPost } from '../request/http';
import { get_prod_detail, get_prodlist, create_order, get_order } from '../request/api';
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
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    [Sku.name]: Sku
  },
  data() {
    return {
      clock: false,
      goods: {
        express: '免运费',
        remain: 19,
      },
      id: this.$route.query.id,
      itemData: {},
      showBase: false, //控制sku是否需要打开
      skuData: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [],
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 0, // 价格（单位分）
            stock_num: 0 // 当前 sku 组合对应的库存
          }
        ],
        hide_stock: false // 是否隐藏剩余库存
      },
      goodsData: {
        title: '', // 商品标题
        picture: '' // 默认商品 sku 缩略图
      },
      quota: 0,
      quotaUsed: 1, //已经购买过的数量
      showAddCartBtn: false
    };
  },
  created() {
    this.shoppingDetail(this.$route.query.id);
    this.getOrder();
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
    orderNow() {
      this.showBase = true;
    },
    /* 点击购买回调 */
    onBuyClicked() {
      const id = this.itemData.item_id;
      const price = this.itemData.price * this.quotaUsed;
      this.createOrder(id, price)
    },
    /* 购买数量变化是触发 */
    stepperChange(value) {
      console.log(value);
      this.quotaUsed = value;
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
        /* 通过es6方法判断是否为空对象 */
        if(Object.keys(res.response.item).length != 0){
          this.clock = true;
          this.itemData = res.response.item;

          this.goodsData.title = this.itemData.title;
          this.goodsData.picture = this.itemData.pic_url;
          this.skuData.list[0].price = this.itemData.price;
          this.skuData.list[0].stock_num = this.itemData.quantity;
          
          this.$store.commit('hideLoading');
        }
      }).catch(err => {})
    },
    /* 生成订单 */
    createOrder(id, price){
      axiosPost(`/api` + create_order, {
        prod_id: id,
        money: price
      }).then(res => {
        console.log(res);
        this.$router.push({
          path: '/firmOrder',
          query: {
            id : id,
            num: this.quotaUsed,
            orderId: res.id,
          }
        })
      }).catch(err => {})
    },
    /* 订单列表 */
    getOrder(){
      axiosPost(`/api` + get_order, {}
      ).then(res => {
        console.log(res);

      }).catch(err => {})
    }
  },
  mounted() {
    
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