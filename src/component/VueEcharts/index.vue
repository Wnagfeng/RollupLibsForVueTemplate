<template>
  <div class="VueEcahrtsWrapper" id="VueEcahrtsWrapper"></div>
</template>

<script setup>
import { watch, onMounted, defineProps } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
  themeColor: {
    type: String,
    default: null,
  },
});

let Dom = null;
let charts = null;

watch(
  () => props.options,
  (newOptions) => {
    if (charts) {
      charts.setOption(newOptions);
    }
  },
  { deep: true }
);

onMounted(() => {
  Dom = document.getElementById("VueEcahrtsWrapper");
  charts = echarts.init(Dom, props.themeColor);
  charts.setOption(props.options);
});
</script>

<script>
export default {
  name: "VueEcharts",
};
</script>

<style lang="scss">
.VueEcahrtsWrapper {
  width: 100%;
  height: 100%;
}
</style>
