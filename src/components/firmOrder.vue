<template>
  <div class="firm-order">

  </div>
</template>

<script>
import { ContactCard, ContactList, ContactEdit } from 'vant';
import { axiosGet, axiosPost } from '../request/http';
import { get_prod_detail, get_prodlist } from '../request/api';
export default {
  name: 'firmOrder',
  components: {

  },
  data() {
    return {
      id: this.$route.query.id,
      itemData: {}
    }
  },
  created() {
    this.shoppingDetail(this.id);
  },
  methods: {
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
  },
  mounted() {

  }
}
</script>

<style lang="less">
  .desc{
    width: 100% !important;
    p{
      width: 100%;
      img{
        width: 100% !important;
      }
    }
  }
</style>
