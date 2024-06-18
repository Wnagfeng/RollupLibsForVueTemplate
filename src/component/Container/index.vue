<template>
  <!-- 实现Container效果 -->
  <div class="ContainerWrapper" id="Container">
    <template v-if="realy">
        <slot></slot>
    </template>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, onUnmounted, nextTick } from 'vue'
const width = ref(0)
const height = ref(0)
const orgingWidth = ref(0)
const orgingHeight = ref(0)
const realy = ref(false)
const props = defineProps({
  // 这里传递的数据是你的比值 比如当前项目需要3840/2160的比值 这就是宽高比
  opstion: {
    type: Object,
  }
})
// 初始化数据
const init = () => {
  realy.value = false
  // 获取dom
  const container = document.getElementById("Container")
  const domwidth = container.clientWidth
  const domheight = container.clientHeight
  // 防止重负调用
  if (!orgingHeight.value || orgingWidth.value) {
    // 初始化视口宽高
    orgingWidth.value = window.screen.width
    orgingHeight.value = window.screen.height
  }
  // 判断用户是否传入宽高
  if (props.opstion && props.opstion.width && props.opstion.height) {
    // 初始化宽高
    width.value = props.opstion.width
    height.value = props.opstion.height
  } else {
    // 初始化宽高
    width.value = domwidth
    height.value = domheight
  }
  realy.value = true

}
// 设置大小
const updataSize = () => {
  const container = document.getElementById("Container")
  if (width.value && height.value) {
    container.style.width = `${width.value}px`
    container.style.height = `${height.value}px`
  } else {
    container.style.width = `${orgingWidth.value}px`
    container.style.height = `${orgingHeight.value}px`
  }
}
// 计算压缩比更新压缩比例
const UpdataStyleScale = () => {
  const container = document.getElementById("Container")
  // 实际视口宽高(当前可视区域不是画布哦！)
  const currentWidth = document.body.clientWidth
  const currentHeight = document.body.clientHeight
  // 接下来我们用width/currentWidth获得横向比值(由于可能width会没有值我们最好做一个判断)
  const realWidth = width.value || orgingWidth.value
  const realHeight = height.value || orgingHeight.value
  // 宽度压缩比
  const widthScale = currentWidth / realWidth
  // 高度压缩比
  const heightScale = currentHeight / realHeight
  container.style.transform = `scale(${widthScale}, ${heightScale})`
  // console.log('执行了')
}
const Onresize = () => {
  init()
  updataSize()
  UpdataStyleScale()
}
onMounted(() => {
  // 初始化数据
  init()
  // 设置页面
  updataSize()
  // 计算缩放比
  UpdataStyleScale()
  window.addEventListener("resize", Onresize)
})
onUnmounted(() => {
  // 释放
  window.removeEventListener("resize", Onresize);
});


</script>
<script>
export default {
  name: 'Container'  // 添加name属性
}
</script>
<style  lang="scss">
.ContainerWrapper {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 9999;
  //background-color: red;
  transform-origin: left top;
  .slotBox{
    width: 100%;
    height: 100%;
  }
}
</style>
