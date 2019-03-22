<template>
  <div class="pay-success">
    <van-icon 
      name="passed" 
      size="60px" 
      class="passed"
      color="green"
    />
    <div class="passed-text">恭喜您，支付成功！</div>
    <van-button plain 
      type="primary" 
      size="small" 
      class="passed-btn"
      @click="paySuccess"
    >完成</van-button>
  </div>
</template>

<script>
import { axiosGet, axiosPost } from '../request/http';
import { get_userinfo, get_prodlist } from '../request/api';
import { Icon, Button } from 'vant';
export default {
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
  },
  created() {
    this.test();
  },
  methods: {
    paySuccess() {
      this.$router.push({
        path: '/'
      })
    },
    test() {
      axiosPost(process.env.API_HOST + get_userinfo, {}).then(res => {
        console.log(res);

      }).catch(err => {})
    }
  }
}
</script>

<style lang="less" scoped>
.pay-success{
  width:100%;
  height:100vh;
  position: relative;
  top: 0;
  left: 0;
  background: #f5f6f7;
  .passed{
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .passed-text{
    width: 100%;
    height: 60px;
    text-align: center;
    position: absolute;
    top: 38%;
  }
  .passed-btn{
    top: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    color: green;
    border-color: green;
  }
}

</style>
