<template>
    <div class="content-list">
        <div class="list-title">我的预约</div>
        <div class="list-content">
            <div class="comment-view">
                <a-spin :spinning="loading" style="min-height: 200px;">
                    <div class="comment-list">
                        <div class="comment-item flex-view" v-for="item in commentData">
                            <div class="infos">
                                <div class="name flex-view">
                                    <h3>{{ item.region }}</h3>
                                </div>
                                <div class="time">预约时间：{{ item.appointmentDate }}</div>
<!--                                <div class="content">{{ item.status }}</div>-->
                            </div>
                            <el-button
                                key="danger"
                                type="danger"
                                text
                                @click="deleteAppointment(item)"
                            >{{ "取消预约" }}</el-button
                            >
                        </div>

                    </div>
                </a-spin>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useUserStore} from "/src/store";

const router = useRouter();
const userStore = useUserStore();

import {listUserCommentsApi} from '/src/api/comment'
import {listAppointmentApi, deleteApi} from '/src/api/appointment'
import {BASE_URL, IMG_BASE} from "/src/store/constants";
import {getFormatTime} from '/src/utils'
import AvatarIcon from "/src/assets/images/avatar.jpg";
import {message} from "ant-design-vue";

const loading = ref(false)

const commentData = ref([])

onMounted(() => {
    getCommentList()
})

// 跳转到对应古董详情页面
const handleClickTitle = (record) => {
    let text = router.resolve({name: 'detail', query: {antiqueId: record.commentAntiqueId}})
    window.open(text.href, '_blank')
}

const getCommentList = () => {
    loading.value = true
    let userId = userStore.user_id
    listAppointmentApi({userId: userId}).then(res => {
        commentData.value = res.rows
        console.log( res.rows)
        loading.value = false
    }).catch(err => {
        message.error(err.msg || '网络异常')
        loading.value = false
    })
}

const deleteAppointment = (item) => {
    // console.log(item.id)
    deleteApi({id: item.id}).then(res => {
        loading.value = false
        message.success("删除成功")
        getCommentList();
    }).catch(err => {
        message.error(err.msg || '删除失败')
        loading.value = false
    })
}



</script>
<style scoped lang="less">
.flex-view {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;


}

.content-list {
  flex: 1;


  .avator {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 40px;
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    margin-right: 12px;
    border-radius: 50%;
    cursor: pointer;
  }

  .list-title {
    color: #152844;
    font-weight: 600;
    font-size: 18px;
    //line-height: 24px;
    height: 48px;
    margin-bottom: 4px;
    border-bottom: 1px solid #cedce4;
  }
}

.comment-view {
  overflow: hidden;

  .comment-list {
    margin: 8px auto;
  }

  .comment-item {
    padding: 15px 0;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 8px;
    }

    .infos {
      position: relative;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }

    .name {
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      cursor: pointer;
    }

    h3 {
      color: #152844;
      font-weight: 600;
      font-size: 14px;
      margin: 0;
    }

    .traingle {
      width: 0;
      height: 0;
      border-left: 6px solid #c3c9d5;
      border-right: 0;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      margin: 0 12px;
    }

    .time {
      color: #5f77a6;
      font-size: 12px;
      line-height: 16px;
      height: 16px;
      margin: 2px 0 8px;
    }

    .content {
      color: #484848;
      font-size: 14px;
      line-height: 22px;
      padding-right: 30px;
    }
  }
}
</style>
