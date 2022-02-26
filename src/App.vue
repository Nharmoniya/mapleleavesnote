<template>
  <div id="app">
   <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}
a {
  text-decoration: none;
}
html, body, #app {
  background-color: rgb(243,243,243);
  height: 100%;
}

#app {
display: flex;

}


</style>
