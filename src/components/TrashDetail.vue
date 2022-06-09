<template>
  <div id="trash-detail">
    <Slider></Slider>
    <h1>{{msg}} : {{ $route.params.noteId }}</h1>
  </div>
</template>

<script>
import Slider from '@/components/Slider';
export default {
  name: 'Login',
  components: {Slider},
  data () {
    return {
      msg: '回收站笔记详情页'
    }
  }
}
</script>

<style scoped>
h1 {
  color: blue;
}
</style>