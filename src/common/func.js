
export const tabChooseRouter = (data) => {
  console.log(this);
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