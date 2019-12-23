export default {
  MagicBG: () => import(/* webpackChunkName: "MagicBG" */ './MagicBG.vue'),
  Scroller: () => import(/* webpackChunkName: "Scroller" */ './Scroller.vue'),
  TabBar: () => import(/* webpackChunkName: "TabBar" */ './TabBar.vue'),
  TitleUI: () => import(/* webpackChunkName: "TitleUI" */ './TitleUI.vue')
}
