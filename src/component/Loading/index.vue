<template>
  <!-- 实现loding加载效果 -->
  <div class="SvgLoadingWrapper">
   
    <svg
      :width="props.width"
      :height="props.height"
      viewBox="0 0 50 50"
      preserveAspectRatio="xMidYMid meet"
    >
      <!-- 
                dasharray=2pir/4
             -->
      <circle
        cx="25"
        cy="25"
        r="22"
        fill="none"
        stroke-width="3"
        :stroke="props.outSidecolor"
        stroke-dasharray="34"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25 "
          to="360 25 25"
          :dur="props.duration + 's'"
          repeatCount="indefinite"
        />
        <!--              注意你的属性stroke不能写错-->
        <animate
          attributeName="stroke"
          :values="OutSideColorAnimation"
          :dur="props.duration + 's'"
          repeatCount="indefinite"
        />
      </circle>

      <circle
        cx="25"
        cy="25"
        r="12"
        fill="none"
        stroke-width="3"
        :stroke="props.inSidecolor"
        stroke-dasharray="19"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360 25 25 "
          to="0 25 25"
          :dur="props.duration + 's'"
          repeatCount="indefinite"
        ></animateTransform>
        <animate
          attributeName="stroke"
          :values="inSideColorAnimation"
          :dur="props.duration + 's'"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
    <div class="LoadingTextWrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
const props = defineProps({
  width: {
    type: [Number, String],
    default: 50,
  },
  height: {
    type: [Number, String],
    default: 50,
  },
  outSidecolor: {
    type: String,
    default: "#3be6cb",
  },
  inSidecolor: {
    type: String,
    default: "#02bcfe",
  },
  duration: {
    type: [Number, String],
    default: 2,
  },
});
const OutSideColorAnimation = computed(() => {
  return `${props.outSidecolor};${props.inSidecolor};${props.outSidecolor}`;
});
const inSideColorAnimation = computed(() => {
  return `${props.inSidecolor};${props.outSidecolor};${props.inSidecolor}`;
});
</script>
<script>
export default {
  name: "SvgLoading", // 添加name属性
};
</script>
<style lang="scss">
.SvgLoadingWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //width: 200px;
  //height: 200px;
  //margin: auto;
  .LoadingTextWrapper {
    margin-top: 20px;
    margin-left: 15px;
    color: #fff;
  }
}
</style>
