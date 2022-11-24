/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-23 15:05:55 
 * @Last Modified by:   liuhanchuan 
 * @Last Modified time: 2022-11-23 15:05:55 
 * 路由配置
 */

import Vue from "vue";
import VueRouter from "vue-router";
import { getCookie } from "@/utils/utils";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "",
    meta: { auth: false },
    redirect: "/list",
    component: () => import('../layout/basicLayout.vue'),
    children: [
      {
        path: "/login",
        name: "登录页",
        meta: {
          auth: false,
        },
        component: () => import("../views/login/index.vue"),
      },
      {
        path: "/home",
        name: "home",
        meta: { auth: true },
        redirect: '/list', // 重定向到互动视频
        component: () => import('../layout/homeLayout.vue'),
        children: [
          {
            path: "/api",
            name: "api列表",
            meta: {
              auth: true,
            },
            component: () => import("../views/apiList/index.vue"),
          },
          {
            path: "/list",
            name: "组件列表",
            meta: {
              auth: true,
            },
            component: () => import("../views/chartList/index.vue"),
          },
        ],
      },
      {
        path: "/customComponent",
        name: "自定义组件",
        meta: {
          auth: true,
        },
        component: () => import("../views/customWebComponent/index.vue"),
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
    if (getCookie('token')) {
      next();
    } else {
      //防止无限循环
      if (to.name === "login") {
        next();
        return;
      }
      next({
        path: "/login",
      });
    }
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
