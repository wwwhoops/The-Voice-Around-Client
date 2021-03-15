import Axios from "axios";
import {get,post} from "./http";

//============歌手相关================
//查询歌手
export const getAllSinger =() => get(`singer/allSinger`);
//根据性别查询歌手
export const getSingerOfSex = (sex) => get(`singer/singerBySex?sex=${sex}`);

//============歌曲相关================
//根据歌手id查询歌曲
export const songOfSingerId =(singerId) => get(`song/allSong?singerId=${singerId}`);
//根据歌手id查询歌曲，字段加别名
export const songOfSingerIdAlias =(singerId) => get(`song/allSongAlias?singerId=${singerId}`);
//根据歌曲id查询歌曲对象
export const songOfSongId =(id) => get(`song/getASongBySongId?songId=${id}`);
//根据歌曲名字模糊查询歌曲
export const likeSongOfName =(keywords) => get(`song/getAllSongByKeywords?keywords=${keywords}`);

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
export const updateUserMsg =(params) => post(`/consumer/update`,params);

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
export const setLike =(params) => post(`/comment/like`,params);
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
export const setCollect =(params) => post(`/collect/add`,params);
//指定用户的收藏列表
export const getCollectOfUserId = (userId) => get(`/collect/collectOfUserId?userId=${userId}`);