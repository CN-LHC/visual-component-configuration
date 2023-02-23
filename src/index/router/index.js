/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-23 15:05:55 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-02-23 15:41:37
 * 路由配置
 */

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "client-layout",
    meta: { auth: false },
    redirect: "/shutu-admin-configuration-component",
    component: () => import('../layout/basicLayout.vue'),
    children: [
      {
        path: "/shutu-admin-configuration-component",
        name: "配置数图",
        meta: {
          auth: true,
        },
        component: () => import("../views/configurationComponent/index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "active",
  routes: routes,
});

router.beforeEach((to, from, next) => {
  //根据字段判断是否路由过滤
  if (to.matched.some((record) => record.meta.auth)) {
    next();
  } else {
    // 当输入不存在的页面地址时候，返回首页
    if (to.matched.length > 0) {
      next();
    } else {
      next({
        path: "/",
      });
    }
  }
});

export default router;
