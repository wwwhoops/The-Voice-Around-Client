import Axios from "axios";
import {get,post} from "./http";

//============歌手相关================
//查询歌手
export const getAllSinger =() => get(`singer/allSinger`);
//根据性别查询歌手
export const getSingerOfSex = (sex) => get(`singer/singerBySex?sex=${sex}`);
//根据图片名模糊查询歌手
export const getSingerByPicName = (picImg) => get(`singer/getSingerByPicName?picName=${picImg}`);

//============歌曲相关================
//根据歌手id查询歌曲
export const songOfSingerId =(singerId) => get(`song/allSong?singerId=${singerId}`);
//根据歌手id查询歌曲，字段加别名
export const songOfSingerIdAlias =(singerId) => get(`song/allSongAlias?singerId=${singerId}`);
//根据歌曲id查询歌曲对象
export const songOfSongId =(id) => get(`song/getASongBySongId?songId=${id}`);
//根据歌曲id查询歌曲和歌手信息
export const songOfSongIdAlias =(id) => get(`song/getASongBySongIdAlias?songId=${id}`);
//根据歌曲名字模糊查询歌曲
export const likeSongOfName =(keywords) => get(`song/getAllSongByKeywords?keywords=${keywords}`);
//查询排行榜
export const getRankList = () => get(`/song/getRankList`);
//根据歌曲id增加歌曲播放了
export const increasePlayCount =(songId) => get(`song/increasePlayCount?songId=${songId}`);

//============歌单相关================
//查询歌单
export const getAllSongList =() => get(`songList/getAllSongList`);
//返回标题或风格包含文字的歌单列表
export const getSongListOfLikeTitle = (keywords) => get(`songList/getAllSongListByKeywords?keywords=${keywords}`);
//根据风格模糊查询歌单列表
// export const getSongListOfLikeStyle = (keywords) => get(`songList/getAllSongListByKeywords?keywords=${keywords}`);


//============歌单的歌曲相关============
//根据歌单id查询歌曲列表
export const listSongDetail = (songListId) => get(`listSong/getListSong?songListId=${songListId}`);

//============用户相关================
//查询用户
export const getAllConsumer =() => get(`consumer/allConsumer`);
//注册
export const SignUp =(params) => post(`/consumer/addConsumer`,params);
//登录
export const loginIn =(params) => post(`/consumer/login`,params);
//根据用户id查询该用户的详细信息
export const getUserOfId =(id) => get(`/consumer/selectInfoById?id=${id}`);
//更新用户信息
export const updateUserMsg =(consumer) => post(`/consumer/updateConsumerInfo`,consumer);

//下载音乐
export const download = (url)  => Axios({
    method: 'get',
    url: url,
    responseType: 'blob'
});

//===========歌单评价======================
//提交评分
export const setRank =(evaluation) => post(`/evaluation/addEvaluation`,evaluation);
//获取指定歌单的平均分
export const getRankOfSongListId = (songListId) => get(`/evaluation/averageScore?songListId=${songListId}`);

//===========评论======================
//提交评论
export const setComment =(comment) => post(`/comment/addComment`,comment);
//点赞
export const setLike =(id, userId) => get(`/comment/like?commentId=${id}&userId=${userId}`);
//返回当前歌单或歌曲的评论列表
export const getAllComment = (type,id) => {
    if(type == 0){              //歌曲
        return get(`/comment/commentOfSongId?songId=${id}`);
    }else{                      //歌单
        return get(`/comment/commentOfSongListId?songListId=${id}`);
    }
}

//===============收藏===================
//新增收藏
export const setCollect =(collect) => post(`/collect/addCollect`,collect);
//查询歌曲的收藏状态
export const getACollect =(userId, songId) => get(`/collect/getACollect?userId=${userId}&songId=${songId}`);
//指定用户的收藏列表
export const getCollectOfUserId = (userId) => get(`/collect/getCollectByUserId?userId=${userId}`);



