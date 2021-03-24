<template>
  <div id="app">
    <the-header />
    <!-- 为路由添加时间戳，以实现点击相同路由时能够刷新这个路由 -->
    <router-view class="music-content" :key="$route.query.t"/>
    <song-audio/>
    <the-aside/>
    <play-bar/>
    <scroll-top/> 
    <the-footer/>  
  </div>
</template>

<script>
import TheHeader from './components/TheHeader';
import ScrollTop from './components/ScrollTop';
import TheFooter from './components/TheFooter';
import SongAudio from './components/SongAudio';
import TheAside from './components/TheAside';
import PlayBar from './components/PlayBar';

export default {
  name: 'App',
  components: {
    TheHeader,
    ScrollTop,
    TheFooter,
    SongAudio,
    TheAside,
    PlayBar
  },
  created () {
//在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
        }

        //在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
        })
  }
}
</script>

<style  lang="scss" scoped>
@import './assets/css/app.scss';
</style>
