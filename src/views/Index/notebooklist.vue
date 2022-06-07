<template>
  <div class="mainBody">
    <div class="slide"><Slider/>S</div>
    <div class="mainForm"></div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import Slider from '@/components/Slider.vue'
export default {
  data() {
  return{

  }
  },
  components:{
    Slider,
  },
  created() {
   this.checkLogin({path:'/login'})
  },
  methods:{
    ...mapActions([
      'checkLogin'
    ])
  }
};
</script>

<style lang="scss">
.mainBody{
  display: flex;
  flex-direction: row;
  .slide{
    border: 1px solid red;
    width: 80px;
  }
  .mainForm{
    width: 100%;
    border: 1px solid black;
  }
}

</style>