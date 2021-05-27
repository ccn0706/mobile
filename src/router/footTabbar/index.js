// 底部导航栏
export default [{
    path: "/home",
    name: "Home",
    component: () =>
      import("@/views/home"),
    meta: {
      title: "首页",
    }
  },
  {
    path: "/classify",
    name: "Classify",
    component: () =>
      import("@/views/classify"),
    meta: {
      title: "分类",
    }
  },
  {
    path: "/mine",
    name: "Mine",
    component: () =>
      import("@/views/mine"),
    meta: {
      title: "我的",
    }
  },
]
