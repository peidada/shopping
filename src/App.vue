<template>
  <div id="app">
    <!-- 封装loading -->
    <div class="loading" v-show="LOADING">
      <van-loading type="circular" size="50px" color="#666" class="loading-icon"/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { Loading } from 'vant';
export default {
  name: 'App',
  components: {
    [Loading.name]: Loading,
  },
  computed:{
    ...mapState([
        'LOADING'
    ])
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.loading{
  width:100%;
  height:100vh;
  position: relative;
  z-index:1000000;
  background-color:rgba(255,255,255,.3);
  top: 0;
  left: 0;
}
.loading-icon{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
