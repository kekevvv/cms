<template>
    <div class="not-match">
        <div class="inner">
            页面不见了，这是一个404页面！
            <a href="/">回到首页</a>
        </div>
    </div>
</template>
<script>
export default{
    name:'404'
}
</script>
<style scoped>
.not-match{
    height: 100vh;
    background-color: #E1E1E1;
    padding:10rem 0;
}
.inner{

    width:25rem;
    margin:0 auto;
}
.inner>a{
    color:rgb(52, 9, 153);
}
</style>