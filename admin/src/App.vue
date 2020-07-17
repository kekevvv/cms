<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
*{
  padding:0;
  margin:0;
  box-sizing:border-box;
}
ol,ul{
  list-style:none;
}
a{
  color:inherit;
  text-decoration: none;
}
.clearfix::after{
  content: '';
  display: block;
  clear: both;
}
</style>
