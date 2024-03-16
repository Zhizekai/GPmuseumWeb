<template>
    <div class="detail">
        <Header/>

        <div class="detail-content">
            <div class="detail-content-top">
                <div style="position: relative;">
                    <div class="thing-infos-view">
                        <div class="thing-infos">
                            <div class="thing-img-box">
                                <img :src="detailData.cover"/>
                            </div>
                            <div class="thing-info-box">
                                <div class="thing-state">
                                    <span class="state hidden-sm">文物状态</span>
                                    <span>管内展出</span>
                                </div>
                                <h1 class="thing-name">{{ detailData.antiqueName }}</h1>
                                <!--                <span>-->
                                <!--                  <span class="a-price-symbol">¥</span>-->
                                <!--                  <span class="a-price">{{detailData.price}}</span>-->
                                <!--                </span>-->
                                <div class="translators flex-view" style="">
                                    <span>朝代：</span>
                                    <span class="name">{{ detailData.categoryName }}</span>
                                </div>
                                <div class="translators flex-view" style="">
                                    <span>地址：</span>
                                    <span class="name">{{ detailData.antiqueAddress }}</span>
                                </div>
                                <button class="buy-btn" @click="handleOrder(detailData)">
                                    <img :src="AddIcon"/>
                                    <span>立即购买</span>
                                </button>
                            </div>
                        </div>
                        <div class="thing-counts hidden-sm">
                            <div class="count-item flex-view pointer" @click="addToWish()">
                                <div class="count-img">
                                    <img :src="WantIcon">
                                </div>
                                <div class="count-box flex-view">
                                    <div class="count-text-box">
                                        <span class="count-title">加入心愿单</span>
                                    </div>
                                    <div class="count-num-box">
                                        <span class="num-text">{{ detailData.antiqueWishCount }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="count-item flex-view pointer" @click="collect()">
                                <div class="count-img">
                                    <img :src="RecommendIcon">
                                </div>
                                <div class="count-box flex-view">
                                    <div class="count-text-box">
                                        <span class="count-title">收藏</span>
                                    </div>
                                    <div class="count-num-box">
                                        <span class="num-text">{{ detailData.antiqueCollectCount }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="count-item flex-view" @click="share()">
                                <div class="count-img">
                                    <img :src="ShareIcon">
                                </div>
                                <div class="count-box flex-view">
                                    <div class="count-text-box">
                                        <span class="count-title">分享</span>
                                    </div>
                                    <div class="count-num-box">
                                        <span class="num-text"></span>
                                        <img :src="WeiboShareIcon" class="mg-l">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="detail-content-bottom">
                <div class="thing-content-view flex-view">
                    <div class="main-content">
                        <div class="order-view main-tab">
                          <span class="tab"
                                :class="selectTabIndex===index? 'tab-select':''"
                                v-for="(item,index) in tabData"
                                :key="index"
                                @click="selectTab(index)">
                            {{ item }}
                          </span>
                            <span :style="{left: tabUnderLeft + 'px'}" class="tab-underline"></span>
                        </div>

                        <!--简介-->
                        <div class="thing-intro" :class="selectTabIndex <= 0? '':'hide'">
                            <p class="text" style="">{{ detailData.antiqueInformation }}</p>
                        </div>

<!-- 3d 展示                        -->
                        <div class="canvas-container" ref="screenDom"></div>

                        <!--评论-->
                        <div class="thing-comment" :class="selectTabIndex > 0? '':'hide'">
                            <div class="title">发表新的评论</div>
                            <div class="publish flex-view">
                                <img :src="AvatarIcon" class="mine-img">
                                <input placeholder="说点什么..." class="content-input" ref="commentRef">
                                <button class="send-btn" @click="sendComment()">发送</button>
                            </div>
                            <div class="tab-view flex-view">
                                <div class="count-text">共有{{ commentData.length }}条评论</div>
                                <div class="tab-box flex-view" v-if="commentData.length > 0">
                                    <span :class="sortIndex === 0? 'tab-select': ''" @click="sortCommentList('recent')">最新</span>
                                    <div class="line"></div>
                                    <span :class="sortIndex === 1? 'tab-select': ''"
                                          @click="sortCommentList('hot')">热门</span>
                                </div>
                            </div>
                            <div class="comments-list">
                                <div class="comment-item" v-for="item in commentData">
                                    <div class="flex-item flex-view">
                                        <img :src="AvatarIcon" class="avator">
                                        <div class="person">
                                            <div class="name">{{ item.museumUser.userName }}</div>
                                            <div class="time">{{ item.createTime }}</div>
                                        </div>
                                        <div class="float-right">
                                            <span @click="like(item.commentId)">推荐</span>
                                            <span class="num">{{ item.likeCount }}</span>
                                        </div>
                                    </div>
                                    <p class="comment-content">{{ item.commentContent }}</p>
                                </div>
                                <div class="infinite-loading-container">
                                    <div class="infinite-status-prompt" style="">
                                        <div slot="no-results" class="no-results">
                                            <div></div>
                                            <p>没有更多了</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="recommend" style="">
                        <div class="title">热门推荐</div>
                        <div class="things">
                            <div class="thing-item thing-item" v-for="item in recommendData"
                                 @click="handleDetail(item)">
                                <div class="img-view">
                                    <img :src="item.cover">
                                </div>
                                <div class="info-view">
                                    <h3 class="thing-name">{{ item.antiqueName.substring(0, 12) }}</h3>
                                    <span>
                                        <span class="a-price-symbol">点赞数</span>
                                        <span class="a-price">{{ item.antiqueCollectCount }}</span>
                                      </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer/>
    </div>
</template>
<script setup>
/* 文章详情页面*/
import {message} from "ant-design-vue";
import Header from '/@/views/index/components/header.vue'
import Footer from '/@/views/index/components/footer.vue'
import AddIcon from '/@/assets/images/add.svg';
import WantIcon from '/@/assets/images/want-read-hover.svg';
import RecommendIcon from '/@/assets/images/recommend-hover.svg';
import ShareIcon from '/@/assets/images/share-icon.svg';
import WeiboShareIcon from '/@/assets/images/wb-share.svg';
import AvatarIcon from '/@/assets/images/avatar.jpg';
import {
    detailApi,
    listApi as listThingList,
} from '/@/api/thing'
import {listThingCommentsApi, createApi as createCommentApi, likeApi} from '/@/api/comment'
import {wishApi} from '/@/api/thingWish'
import {collectApi} from '/@/api/thingCollect'
import {BASE_URL, IMG_BASE} from "/@/store/constants";
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {useUserStore} from "/@/store";
import {getFormatTime} from "/@/utils";

// threejs 组件
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const router = useRouter()
const route = useRoute()
const userStore = useUserStore();
let screenDom = ref();
let camera, scene, renderer, controls, ambientLight


let thingId = ref('')
let detailData = ref({})
let tabUnderLeft = ref(6)
let tabData = ref(['简介', '评论'])
let selectTabIndex = ref(0)

let commentData = ref([])
let recommendData = ref([])
let sortIndex = ref(0)
let order = ref('createTime') // 默认排序最新

let commentRef = ref()

onMounted(() => {
    // 从url中获取古董id
    thingId.value = route.query.antiqueId.trim()
    getThingDetail()
    getRecommendThing()  // 获取热门推荐列表
    getCommentList()

    // 初始化threejs 对象
    scene = new THREE.Scene();
    // 创建相机
    camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );
    camera.position.set(300, 300, 300); //important

    //光源，color:灯光颜色，intensity:光照强度
    let directionalLight = new THREE.DirectionalLight('#ffffff', 2.5);
    directionalLight.position.set(0, 20, 30);
    scene.add(directionalLight);

    // 添加环境光
    let ambient = new THREE.AmbientLight('#ffffff',2);
    scene.add(ambient); //将环境光添加到场景中

    // let geometry = new THREE.BoxGeometry(200, 30, 160);
    // // 将MeshBasicMaterial修改为MeshLambertMaterial
    // const material1 = new THREE.MeshLambertMaterial({ color: 0x64B5D6 });
    // const material2 = new THREE.MeshLambertMaterial({  side: THREE.DoubleSide, color: 0xCED0D1 });
    // // 左           右        上           下        前         后
    // let materialArry = [material1, material1,material2, material1, material1, material1];
    // const mesh = new THREE.Mesh(geometry, materialArry);
    // mesh.castShadow = true; // cast投射，方块投射阴影
    // mesh.receiveShadow = true; // 物体接收阴影
    // scene.add(mesh);

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(new THREE.Color("#4a559b"));
    renderer.setSize(screenDom.value.clientWidth, screenDom.value.clientHeight);
    renderer.domElement.addEventListener("click", onClick, false);
    screenDom.value.appendChild(renderer.domElement);
    // 创建轨道
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = true;  // 右键拖拽
    controls.enableZoom = true;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 9;
    controls.update(); //重新设置轨道，相当于刷新

    //添加模型
    const loader = new GLTFLoader();
    loader.load(
        "/glb/ding_censer_with_an_openwork_cover.glb",
        // "/glb/red_cra .glb",
        (gltf) => {
            // 加载成功后的回调函数
            const model = gltf.scene;

            // const box = new THREE.Box3().setFromObject(model);
            // const center = box.getCenter(new THREE.Vector3());

            // 旋转模型
            // let axis = new THREE.Vector3(0, 1, 0);
            // model.rotateOnAxis(axis, Math.PI * 2);
            // model.position.sub(center); // 将模型位置移到原点处

            scene.add(model);
        },
        (xhr) => {
            // 加载过程中的回调函数
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
            // 加载失败的回调函数
            console.error("Failed to load model", error);
        }
    );

    // 渲染场景
    const render = () => {
        renderer.render(scene, camera);
        controls.update();
        requestAnimationFrame(render);
    };
    render();


})

const onClick = () => {
    event.preventDefault();
    const mouse = new THREE.Vector2();
    const rect = screenDom.value.getBoundingClientRect()
    mouse.x = ((event.clientX + rect.left) / window.innerWidth) * 2 - 1;
    mouse.y = -((event.clientY + rect.top) / window.innerHeight) * 2 + 1;
    console.log("x:" + mouse.x, "y:" + mouse.y);
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children); //array
    if (intersects.length > 0) {
        var selectedObject = intersects[0];
        console.log(selectedObject.object.name);
    }
}

const selectTab = (index) => {
    selectTabIndex.value = index
    tabUnderLeft.value = 6 + 54 * index
}

const getThingDetail = () => {
    detailApi({antiqueId: thingId.value}).then(res => {
        detailData.value = res.data
        // detailData.value.cover = BASE_URL + IMG_BASE + detailData.value.antiqueImg
    }).catch(err => {
        message.error('获取详情失败')
    })
}
const addToWish = () => {
    let userId = userStore.user_id
    if (userId) {
        wishApi({thingId: thingId.value, userId: userId}).then(res => {
            message.success(res.msg)
            getThingDetail()
        }).catch(err => {
            console.log('操作失败')
        })
    } else {
        message.warn('请先登录')
    }
}
/* 添加收藏*/
const collect = () => {
    let userId = userStore.user_id
    if (userId) {
        collectApi({antiqueId: thingId.value, userId: userId}).then(res => {
            message.success(res.msg)
            getThingDetail()
        }).catch(err => {
            console.log('收藏失败')
        })
    } else {
        message.warn('请先登录')
    }
}
const share = () => {
    let content = '分享一个非常好玩的网站 ' + window.location.href
    let shareHref = 'http://service.weibo.com/share/share.php?title=' + content
    window.open(shareHref)
}
const handleOrder = (detailData) => {
    console.log(detailData)
    const userId = userStore.user_id
    router.push({
        name: 'confirm',
        query:
            {
                id: detailData.id,
                title: detailData.title,
                cover: detailData.cover,
                price: detailData.price
            }
    })
}

/* 热门推荐模块*/
const getRecommendThing = () => {
    listThingList({orderByColumn: 'antiqueRecommendCount'}).then(res => {
        res.data.forEach((item, index) => {
            if (item.antiqueImg) {
                item.cover = BASE_URL + IMG_BASE + item.antiqueImg
            }
        })
        recommendData.value = res.data.slice(0, 6)
    }).catch(err => {
        console.log(err)
    })
}
const handleDetail = (item) => {
    // 跳转新页面
    let text = router.resolve({name: 'detail', query: {antiqueId: item.antiqueId}})
    window.open(text.href, '_blank')
}
const sendComment = () => {
    console.log(commentRef.value)
    let text = commentRef.value.value.trim()
    console.log(text)
    if (text.length <= 0) {
        return
    }
    commentRef.value.value = ''
    let userId = userStore.user_id
    if (userId) {
        createCommentApi({commentContent: text, commentAntiqueId: thingId.value, commentUserId: userId}).then(res => {
            getCommentList()
        }).catch(err => {
            console.log(err)
        })
    } else {
        message.warn('请先登录！')
        router.push({name: 'login'})
    }
}
const like = (commentId) => {
    likeApi({id: commentId}).then(res => {
        getCommentList()
    }).catch(err => {
        console.log(err)
    })
}

// 获取评论列表
const getCommentList = () => {
    listThingCommentsApi({commentAntiqueId: thingId.value, orderByColumn: order.value}).then(res => {
        res.data.forEach(item => {
            item.commentTime = getFormatTime(item.commentTime, true)
        })
        commentData.value = res.data
    }).catch(err => {
        console.log(err)
    })
}
const sortCommentList = (sortType) => {
    if (sortType === 'recent') {
        sortIndex.value = 0
    } else {
        sortIndex.value = 1
    }
    order.value = sortType
    getCommentList()
}

</script>
<style scoped lang="less">

.hide {
  display: none;
}

.detail-content {
  display: flex;
  flex-direction: column;
  width: 1100px;
  margin: 4px auto;
}

.flex-view {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.hidden-lg {
  display: none !important;
}

.thing-infos-view {
  display: flex;
  margin: 89px 0 40px;
  overflow: hidden;

  .thing-infos {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: flex;
  }

  .mobile-share-box {
    height: 38px;
    background: transparent;
    padding: 0 16px;
    margin: 12px 0;
    font-size: 0;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;

    .state {
      width: 64px;
      height: 24px;
      line-height: 24px;
      background: rgba(70, 132, 226, .1);
      border-radius: 2px;
      font-weight: 500;
      font-size: 12px;
      color: #4684e2;
      text-align: center;
    }

    .share-img {
      background: #fff;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      text-align: center;

      img {
        position: relative;
        top: 4px;
        width: 24px;
      }
    }
  }

  .thing-img-box {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 235px;
    flex: 0 0 235px;
    margin: 0 40px 0 0;

    img {
      width: 255px;
      height: 200px;
      display: block;
      background-size: cover;
      object-fit: cover;
    }
  }

  .thing-info-box {
    text-align: left;
    padding: 0;
    margin: 0;
  }

  .thing-state {
    height: 26px;
    line-height: 26px;

    .state {
      font-weight: 500;
      color: #4684e2;
      background: rgba(70, 132, 226, .1);
      border-radius: 2px;
      padding: 5px 8px;
      margin-right: 16px;
    }

    span {
      font-size: 14px;
      color: #152844;
    }
  }

  .thing-name {
    line-height: 32px;
    margin: 16px 0;
    color: #0F1111 !important;
    font-size: 18px !important;
    font-weight: 400 !important;
    font-style: normal !important;
    text-transform: none !important;
    text-decoration: none !important;
  }

  .translators, .authors {
    line-height: 18px;
    font-size: 14px;
    margin: 8px 0;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;

    .name {
      color: #315c9e;
      white-space: normal;
    }
  }

  .tags {
    position: absolute;
    bottom: 20px;
    margin-top: 16px;

    .category-box {
      color: #152844;
      font-size: 14px;

      .title {
        color: #787878;
      }
    }
  }

  .thing-counts {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 235px;
    flex: 0 0 235px;
    margin-left: 20px;
  }

  .pointer {
    cursor: pointer;
  }

  .count-item {
    height: 64px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
  }

  .count-img {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 32px;
    flex: 0 0 32px;
    margin-right: 24px;
    font-size: 0;

    img {
      width: 100%;
      display: block;
    }
  }

  .count-box {
    position: relative;
    border-bottom: 1px solid #cedce4;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: 100%;
  }

  .count-text-box {
    font-size: 0;

    .count-title {
      color: #152844;
      font-weight: 600;
      font-size: 16px;
      line-height: 18px;
      display: block;
      height: 18px;
    }
  }

  .count-num-box {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #152844;
  }
}

.buy-btn {
  cursor: pointer;
  display: block;
  background: #4684e2;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  height: 36px;
  line-height: 36px;
  width: 110px;
  outline: none;
  border: none;
  margin-top: 18px;
}

.buy-btn img {
  width: 12px;
  margin-right: 2px;
  vertical-align: middle;
}

.buy-btn span {
  vertical-align: middle;
}

.buy-way {
  overflow: hidden;

  .title {
    font-weight: 600;
    font-size: 18px;
    height: 26px;
    line-height: 26px;
    color: #152844;
    margin-bottom: 12px;
  }
}

.thing-content-view {
  margin-top: 40px;
  padding-bottom: 50px;
}

.main-content {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;

  .text {
    color: #484848;
    font-size: 16px;
    line-height: 26px;
    padding-left: 12px;
    margin: 11px 0;
    white-space: pre-wrap;
  }
}

.main-tab {
  border-bottom: 1px solid #cedce4;
}

.order-view {
  position: relative;
  color: #6c6c6c;
  font-size: 14px;
  line-height: 40px;

  .title {
    margin-right: 8px;
  }

  .tab {
    margin-right: 20px;
    cursor: pointer;
    color: #5f77a6;
    font-size: 16px;
    cursor: pointer;
  }

  .tab-select {
    color: #152844;
    font-weight: 600;
  }

  .tab-underline {
    position: absolute;
    bottom: 0;
    left: 84px;
    width: 16px;
    height: 4px;
    background: #4684e2;
    -webkit-transition: left .3s;
    transition: left .3s;
  }
}

.recommend {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 235px;
  flex: 0 0 235px;
  margin-left: 20px;

  .title {
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    color: #152844;
    margin-bottom: 12px;
  }

  .things {
    border-top: 1px solid #cedce4;

    .thing-item {
      min-width: 255px;
      max-width: 255px;
      position: relative;
      flex: 1;
      margin-right: 20px;
      height: fit-content;
      overflow: hidden;
      margin-top: 26px;
      margin-bottom: 36px;
      padding-bottom: 24px;
      border-bottom: 1px #e1e1e1 solid;
      cursor: pointer;

      .img-view {
        //background: #f3f3f3;
        //text-align: center;
        height: 200px;
        width: 255px;
        //border: 1px #f3f3f3 solid;

        img {
          height: 200px;
          width: 255px;
          overflow: hidden;
          margin: 0 auto;
          background-size: cover;
          object-fit: cover;
        }
      }

      .info-view {
        //background: #f6f9fb;
        overflow: hidden;
        padding: 0 16px;

        .thing-name {
          line-height: 32px;
          margin-top: 12px;
          color: #0F1111 !important;
          font-size: 15px !important;
          font-weight: 400 !important;
          font-style: normal !important;
          text-transform: none !important;
          text-decoration: none !important;
        }

        .price {
          color: #ff7b31;
          font-size: 20px;
          line-height: 20px;
          margin-top: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .translators {
          color: #6f6f6f;
          font-size: 12px;
          line-height: 14px;
          margin-top: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

  }
}

.flex-view {
  display: flex;
}

.canvas-container {
  width: 800px;
  height: 500px;
}

.thing-comment {
  .title {
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    height: 22px;
    color: #152844;
    margin: 24px 0 12px;
  }

  .publish {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

    .mine-img {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 40px;
      flex: 0 0 40px;
      margin-right: 12px;
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }

    .content-input {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      background: #f6f9fb;
      border-radius: 4px;
      height: 32px;
      line-height: 32px;
      color: #484848;
      padding: 5px 12px;
      white-space: nowrap;
      outline: none;
      border: 0px;
    }

    .send-btn {
      margin-left: 10px;
      background: #4684e2;
      border-radius: 4px;
      -webkit-box-flex: 0;
      -ms-flex: 0 0 80px;
      flex: 0 0 80px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      height: 32px;
      line-height: 32px;
      outline: none;
      border: 0px;
      cursor: pointer;
    }
  }

  .tab-view {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    font-size: 14px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin: 24px 0;

    .count-text {
      color: #484848;
      float: left;
    }

    .tab-box {
      color: #5f77a6;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

      .tab-select {
        color: #152844;
      }

      span {
        cursor: pointer;
      }
    }

    .line {
      width: 1px;
      height: 12px;
      margin: 0 12px;
      background: #cedce4;
    }
  }
}


.comments-list {
  .comment-item {
    .flex-item {
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding-top: 16px;

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

      .person {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
      }

      .name {
        color: #152844;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        height: 22px;
        cursor: pointer;
      }

      .time {
        color: #5f77a6;
        font-size: 12px;
        line-height: 16px;
        height: 16px;
        margin-top: 2px;
      }

      .float-right {
        color: #4684e2;
        font-size: 14px;
        float: right;

        span {
          margin-left: 19px;
          cursor: pointer;
        }

        .num {
          color: #152844;
          margin-left: 6px;
          cursor: auto;
        }
      }
    }
  }
}

.comment-content {
  margin-top: 8px;
  color: #484848;
  font-size: 14px;
  line-height: 22px;
  padding-bottom: 16px;
  border-bottom: 1px dashed #cedce4;
  margin-left: 52px;
  overflow: hidden;
  word-break: break-word;
}

.infinite-loading-container {
  clear: both;
  text-align: center;
}

.a-price-symbol {
  top: -0.5em;
  font-size: 12px;
}

.a-price {
  color: #0F1111;
  font-size: 21px;
}
</style>
