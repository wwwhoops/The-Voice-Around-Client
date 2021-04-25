<template>
    <div class="swiper">
        <el-carousel :interval="4000" type="card" height="280px">
            <el-carousel-item v-for="(item,index) in swiperList" :key="index">
                <img :src="item.picImg" @click="goAlbum(item.picImg)"/>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import {swiperList} from "../assets/data/swiper";
import {getSingerByPicName} from '../api/index';
export default {
    name: "swiper",
    data() {
        return {
            swiperList: [], //轮播图数组
        }
    },
    created () {
        this.swiperList = swiperList;
    },
    methods: {
        //跳转
        goAlbum(picImg){
            //根据轮播图名查询对应的资源（歌手id）
            getSingerByPicName(picImg)
                .then(res =>{
                    this.$store.commit("setTempList", res.data[0]);
                    console.log(res.data.id)
                    this.$router.push({path:`singer-album/${res.data[0].id}`});
                })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/swiper.scss';
</style>