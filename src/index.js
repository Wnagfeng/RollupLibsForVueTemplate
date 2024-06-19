import SvgLoading from "./component/Loading/inedx";
import FlyBox from "./component/FlyBox/inedx";
import Container from "./component/Container/inedx";
import VueEcharts from "./component/VueEcharts/index";
export default function (vue) {
  vue.use(SvgLoading);
  vue.use(FlyBox);
  vue.use(Container);
  vue.use(VueEcharts);
}
