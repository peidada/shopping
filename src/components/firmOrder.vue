<template>
  <div class="firm-order">
    <van-contact-card
      :type="cardType"
      :name="currentContact.name"
      :tel="currentContact.tel"
      @click="showListAddress = true"
    />
    <van-popup v-model="showListAddress" position="bottom">
      <van-contact-list
        v-model="chosenContactId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </van-popup>
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>

    <van-card
      :num="num"
      :price="(itemData.price / 100).toFixed(2)"
      :desc="itemData.summary"  
      :title="itemData.title"
      :thumb="itemData.pic_url"
    />

    <van-coupon-cell
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showListCoupon = true"
      class="order-coupon"
    />

    <van-popup v-model="showListCoupon" position="bottom">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>

    <van-cell-group>
      <van-cell title="配送方式" value="普通快递 免运费" />
    </van-cell-group>

    <van-cell-group>
      <van-field
        label="买家留言"
        type="textarea"
        placeholder="建议留言前先与商家沟通确认"
        rows="1"
        autosize
        class="order-field"
      />
    </van-cell-group>

    <div class="order-price-group">
      <div class="group">
        <div class="group-name">商品金额</div>
        <div class="group-value">￥{{(itemData.price * num / 100 ).toFixed(2)}}</div>
      </div>
      <div class="group">
        <div class="group-name">运费</div>
        <div class="group-value">+￥0.00</div>
      </div>
      <div v-if="couponFlag" class="group">
        <div class="group-name">优惠</div>
        <div class="group-value">-￥{{(coupons[chosenCoupon].value / 100).toFixed(2)}}</div>
      </div>
    </div>

    <van-cell-group class="order-total">
      <van-cell title=" ">
        <span class="total-name">合计：</span>
        <span class="total-color">{{total}}</span>
      </van-cell>
    </van-cell-group>

    <van-submit-bar
      :price="submitPrice"
      :button-text="submitText"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import {
  ContactCard, ContactList, ContactEdit, Popup, Card, CouponCell, CouponList,
  Field, Cell, CellGroup, SubmitBar 
} from 'vant';
import { axiosGet, axiosPost } from '../request/http';
import { get_prod_detail, get_prodlist, pay_order } from '../request/api';

const coupon = {
  available: 1,
  condition: '无使用门槛最\n多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元'
};


export default {
  name: 'firmOrder',
  components: {
    [ContactCard.name]: ContactCard,
    [ContactList.name]: ContactList,
    [ContactEdit.name]: ContactEdit,
    [Popup.name]: Popup,
    [Card.name]: Card,
    [CouponCell.name]: CouponCell,
    [CouponList.name]: CouponList,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [SubmitBar.name]: SubmitBar,
  },
  data() {
    return {
      id: this.$route.query.id,
      num: this.$route.query.num,
      orderId: this.$route.query.orderId,
      itemData: {},
      couponFlag: false,
      // currentContact: {
      //   name: '',
      //   tel: '',
      // },
      chosenContactId: null,
      editingContact: {},
      showListAddress: false,
      showListCoupon: false,
      showEdit: false,
      isEdit: false,
      list: [{
        name: 'smoke',
        tel: '13718195083',
        id: 0
      }],

      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],

      total: '',
      submitPrice: 0,
      submitText: '去支付',
    }
  },
  created() {
    this.shoppingDetail(this.id);
  },
  computed: {
    cardType() {
      return this.chosenContactId !== null ? 'edit' : 'add';
    },

    currentContact() {
      const id = this.chosenContactId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
    }
  },
  methods: {
    /* 商品详情 */
    shoppingDetail(id){
      this.$store.commit('showLoading');
      axiosPost(process.env.API_HOST + get_prod_detail, {
        item_id: id
      }).then(res => {
        console.log(res);
        this.itemData = res.response.item;
        /* 算出合计的值 */
        this.total = `￥` + (this.itemData.price * this.num / 100 ).toFixed(2);
        this.submitPrice = this.itemData.price * this.num;
        this.$store.commit('hideLoading');
      }).catch(err => {})
    },
    /* 新建联系人 */
    onAdd() {
      this.editingContact = { id: this.list.length };
      this.isEdit = false;
      this.showEdit = true;
    },
    /* 编辑联系人 */
    onEdit(item) {
      this.isEdit = true;      
      this.showEdit = true;
      this.editingContact = item;
    },
    /* 选中联系人 */
    onSelect() {
      this.showListAddress = false;
    },
    /* 保存联系人 */
    onSave(info) {
      this.showEdit = false;
      this.showListAddress = false;
      
      if (this.isEdit) {
        this.list = this.list.map(item => item.id === info.id ? info : item);
      } else {
        this.list.push(info);
      }
      this.chosenContactId = info.id;
    },
    /* 删除联系人 */
    onDelete(info) {
      this.showEdit = false;
      this.list = this.list.filter(item => item.id !== info.id);
      if (this.chosenContactId === info.id) {
        this.chosenContactId = null;
      }
    },

    /* 选中事件 */
    onChange(index) {
      this.showListCoupon = false;
      this.chosenCoupon = index;
      if(index == -1){
        this.couponFlag = false;
        this.total = `￥` + (this.itemData.price * this.num / 100 ).toFixed(2);
        this.submitPrice = this.itemData.price * this.num;
      }else{
        this.couponFlag = true;
        this.total = `￥` + ((this.itemData.price * this.num - this.coupons[this.chosenCoupon].value) / 100 ).toFixed(2);
        this.submitPrice = this.itemData.price * this.num - this.coupons[this.chosenCoupon].value;
      }
    },
    /* 兑换 */
    onExchange(code) {
      this.coupons.push(coupon);
    },
    /* 去支付 */
    onSubmit() {
      axiosPost(process.env.API_HOST + pay_order, {
        order_id: this.orderId
      }).then(res => {
        console.log(res);
        // paystatus (支付状态)
        if(res.paystatus == 1){
          this.$router.push({
            path: '/paySuccess'
          })
        }
      }).catch(err => {})
    },

  },
  mounted() {
    
  }
}
</script>

<style lang="less">
  .firm-order{
    width: 100%;
    min-height: 100vh;
    background-color: #f5f6f7;
    .order-coupon{
      margin: .63rem 0;
    }
    .order-field{
      margin-bottom: .63rem;
    }
    .order-price-group{
      width: 100%;
      height: auto;
      .group{
        width: 100%;
        height: 30px;
        line-height: 30px;
        background: #fff;
        font-size: .75rem;
        padding: 0 .88rem;
        box-sizing: border-box;
        .group-name{
          float: left;
        }
        .group-value{
          float: right;
        }
      }
    }
    .order-total{
      .total-name{
        color: #2c3e50;
      }
      .total-color{
        color: #ff4444;
        font-weight: bold;
      }
    }
  }
</style>
