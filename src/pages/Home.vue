<template>
  <div class="home">
    <swiper />
    <div class="section" v-for="(item,index) in songsList" :key="index">
      <div class="section-title">{{item.name}}</div>
      <content-list :contentList="item.list"></content-list>
    </div>
  </div>
</template>

<script>
import Swiper from "../components/Swiper";
import contentList from '../components/ContentList';
import {mapGetters} from 'vuex';
import {getAllSinger,getAllSongList,getRecommendSongList} from '../api/index';
export default {
  name: 'home',
  components: {
    Swiper,
    contentList
  },
  data () {
    return {
      songsList: [
        {name:"精选歌单",list: []},
        {name:"热门歌手",list: []}
      ]
    }
  },
  computed:{
        ...mapGetters([
            'userId',           //当前登录用户id
        ])
    },
  created () {
   this.getRecommendSongList1(this.userId);
   this.getSinger();
  },
  methods: {
    getRecommendSongList1(userId){
      if(userId == null){
        userId = ""
      }
      getRecommendSongList(userId).then((res) => {
        this.songsList[0].list = res.data
      }).catch((err) => { 
        console.log(err);
      })
    },
    getSinger(){                      //获取前十名歌手
      getAllSinger().then((res) => {
        this.songsList[1].list = res.data.slice(0,10);
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/home.scss';
</style>
