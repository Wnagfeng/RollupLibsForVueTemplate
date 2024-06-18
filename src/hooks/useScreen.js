import { ref, onMounted } from "vue";

const init = (id) => {
  const width = ref(0);
  const height = ref(0);
  // 获取dom

  onMounted(() => {
    const container = document.getElementById(id);
    const domwidth = container.clientWidth;
    const domheight = container.clientHeight;
    // 初始化宽高
    width.value = domwidth;
    height.value = domheight;
  });
  return {
    width,
    height,
  };
};
export default init;
