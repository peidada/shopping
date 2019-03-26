<template>
  <div class="user-detail">
    <div class="user-detail-title">基本信息</div>

    <van-collapse v-model="activeNames">
      <van-collapse-item title="姓名" name="1" :value="name">
        <van-field v-model="nameValue" placeholder="请输入姓名" />
        <van-button plain type="primary" size="small" class="name-btn" @click="nameClick">确定</van-button>
      </van-collapse-item>
      <van-collapse-item title="手机号" name="2" :value="phone">
        <van-field v-model="phoneValue" placeholder="请输入手机号" />
        <van-button plain type="primary" size="small" class="name-btn" @click="phoneClick">确定</van-button>
      </van-collapse-item>
      <van-collapse-item title="收货地址" name="3" :value="address">
        <van-field v-model="addressValue" placeholder="请输入收货地址" />        
        <van-button plain type="primary" size="small" class="name-btn" @click="addressClick">确定</van-button>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import { axiosGet, axiosPost } from '../request/http';
import { get_userinfo, upt_userinfo } from '../request/api';
import { Icon, Button, Cell, CellGroup, Collapse, CollapseItem, Field, Toast } from 'vant';
export default {
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Field.name]: Field,
  },
  data() {
    return{
      name: '',
      phone: '',
      address: '',
      nameValue: '',
      phoneValue: '',
      addressValue: '',
      activeNames: []
    }
  },
  created() {
    if(this.$store.state.name == ''){
      this.name = '请填写姓名';
    }else{
      this.name = this.$store.state.name;
    }
    if(this.$store.state.phone == ''){
      this.phone = '请填写手机号';
    }else{
      this.phone = this.$store.state.phone;
    }
    if(this.$store.state.address == ''){
      this.address = '请填写地址';
    }else{
      this.address = this.$store.state.address;
    }
  },
  methods: {
    /* 更新userInfo */
    uptUserInfo(data, type) {
      if(type == 'name'){
        axiosPost(process.env.API_HOST + upt_userinfo, {
          shop_username: data,
        }).then(res => {
          console.log(res);
          Toast('姓名更新成功！');
          this.name = data;
          this.activeNames = [];
        }).catch(err => {})
      }else if(type == 'phone'){
        axiosPost(process.env.API_HOST + upt_userinfo, {
          shop_mobile: data,
        }).then(res => {
          console.log(res);
          Toast('手机号更新成功！');
          this.phone = data;
          this.activeNames = [];
        }).catch(err => {})
      }else if(type == 'address'){
        axiosPost(process.env.API_HOST + upt_userinfo, {
          shop_addr: data,
        }).then(res => {
          console.log(res);
          Toast('收货地址更新成功！');
          this.address = data;
          this.activeNames = [];
        }).catch(err => {})
      }
    },
    nameClick() {
      this.uptUserInfo(this.nameValue, 'name');
    },
    phoneClick() {
      this.uptUserInfo(this.phoneValue, 'phone');
    },
    addressClick() {
      this.uptUserInfo(this.addressValue, 'address');
    }
  }
}
</script>

<style lang="less" scoped>
  .user-detail{
    width: 100%;
    height: 100vh;
    background-color: #f5f6f7;
    &-title{
      width: 100%;
      height: 2.5rem;
      line-height: 2.5rem;
      padding-left: 0.85rem;
      box-sizing: border-box;
    }
    .name-btn{
      position: absolute;
      right: 1rem;
      top: 4rem;
    }
  }
</style>

<style>
  .user-detail .van-field__control{
    width: 70% !important;
  }
</style>

