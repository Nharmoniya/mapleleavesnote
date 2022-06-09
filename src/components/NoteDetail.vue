<template>
  <div id="note-detail">
    <slider></slider>
  </div>
</template>

<script>
import Slider from '@/components/Slider';
export default {
  name: 'Login',
  components: {Slider},
  data () {
    return {
      msg: '笔记详情页'
    }
  }
}
</script>

<style scoped>
#note-detail{
  flex: 1;
}
</style>