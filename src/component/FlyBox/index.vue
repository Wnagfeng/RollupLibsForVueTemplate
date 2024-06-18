<template>
  <!-- 实现Flybox效果 -->
  <div class="FlyBoxWrapper" :id="FlyBoxWrapperId">
    <svg :width="width" :height="height">
      <defs>
        <!--填充效果(内聚渐变)-->
        <radialGradient id="radialPath" cx="50%" cy="50%" fx="100%" fy="50%" r="50%">
          <!--这里是渐变效果的逐渐渐变-->
          <stop offset="0%" stop-color="#4fd2dd" stop-opacity="1">
          </stop>
          <stop offset="100%" stop-color="#4fd2dd" stop-opacity="0"></stop>
        </radialGradient>
        <!--蒙版-->
        <mask :id="flyboxMaskIdD">
          <!--填充渐变效果-->
          <circle r="60" cx="0" cy="0" :fill="`url(#radialPath)`">
            <animateMotion dur="5s" :path="pathValue" rotate="auto" repeatCount="indefinite">
            </animateMotion>
          </circle>
        </mask>
        <!--线条-->
        <path :id="flyBoxPathID" :d="pathValue" fill="none"></path>
      </defs>
      <use :href="`#${flyBoxPathID}`" stroke-width="1" stroke="#235fa7"></use>
      <use :href="`#${flyBoxPathID}`" stroke-width="3" stroke="#4fd2dd" :mask="`url(#${flyboxMaskIdD})`"></use>
    </svg>
    <div class="SlotBox">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { createClipPath } from 'echarts/lib/chart/helper/createClipPathFromCoordSys';
const width = ref(0)
const height = ref(0)
const uuid = uuidv4()
// 使用uuid对我们的类名进行唯一定制
const flyBoxPathID = `flyBoxPathID${uuid}`
const FlyBoxWrapperId = `FlyBoxWrapper${uuid}`
const flyboxMaskIdD = `flyboxMask${uuid}`
const pathValue = computed(() => {
  return `M5 5 L${width.value - 5} 5 L${width.value - 5} ${height.value - 5} L5 ${height.value - 5} Z`
})
const props = defineProps({
  // 添加你的自定义属性
})
onMounted(() => {
   console.log("挂载了")
  const Wrapper = document.getElementById(FlyBoxWrapperId);
   console.log(Wrapper.clientHeight)
  width.value = Wrapper.clientWidth
  height.value = Wrapper.clientHeight
})

</script>
<script>
export default {
  name: 'FlyBox'  // 添加name属性
}
</script>
<style  lang="scss">
.FlyBoxWrapper {
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0 auto;
  color: #fff;

  svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}

.SlotBox {
  padding: 10px;

  height: 96%;
}
</style>
