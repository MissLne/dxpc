import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../views/Index/Index.vue";
import accountManage from "@/views/Index/BusinessManage/accountManage/accountManage.vue";
import activityManage from "@/views/Index/BusinessManage/activityManage/activityManage.vue";
import consultateEvaluation from "@/views/Index/BusinessManage/consultateEvaluation/consultateEvaluation.vue";
import comment from "@/views/Index/BusinessManage/comment/comment.vue";


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: (to: {}) => {
            return '/login';
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/Login.vue')
    },
    {
        path: '/Index',
        name: 'index',
        component: Index,
        children: [{
            path: 'businessManage',
            name: 'businessManage',
            component: () => import('@/views/Index/BusinessManage/BusinessManage.vue'),
            children: [
                {
                    path: 'accountManage',
                    name: 'accountManage',
                    component: () => import('@/views/Index/BusinessManage/accountManage/accountManage.vue')
                },
                {
                    path: 'activityManage',
                    name: 'activityManage',
                    component: () => import('@/views/Index/BusinessManage/activityManage/activityManage.vue'),
                    children: [{
                        path: 'addActivity',
                        name: 'addActivity',
                        component: () => import('@/views/Index/BusinessManage/activityManage/AddActivity/AddActivity.vue'),
                    }, {
                        path: 'activityDetail/:activityId',
                        name: 'activityDetail',
                        component: () => import('@/views/Index/BusinessManage/activityManage/ActivityDetail/ActivityDetail.vue'),
                    }, {
                        path: 'updateActivity/:activityId',
                        name: 'updateActivity',
                        component: () => import("@/views/Index/BusinessManage/activityManage/UpdateActivity/UpdateActivity.vue")
                    }]
                },
                {
                    path: 'consultateEvaluation',
                    name: 'consultateEvaluation',
                    component: () => import('@/views/Index/BusinessManage/consultateEvaluation/consultateEvaluation.vue')
                },
                {
                    path: 'dataAnalysis',
                    name: 'dataAnalysis',
                    component: () => import('@/views/Index/BusinessManage/dataAnalysis/DataAnalysis.vue')
                },
                {
                    path: 'financialManage',
                    name: 'financialManage',
                    component: () => import('@/views/Index/BusinessManage/financialManage/FinancialManage.vue'),
                    children: [{
                        path: 'finAccountSetting',
                        name: 'finAccountSetting',
                        component: () => import('@/views/Index/BusinessManage/financialManage/finAccountSetting/finAccountSetting.vue')
                    }]
                },
                {
                    path : 'comment',
                    name : 'comment',
                    component : () => import('@/views/Index/BusinessManage/comment/comment.vue')
                }
            ]
        }, {
            path: 'backgroundManage',
            name: 'backgroundManage',
            component: () => import('@/views/Index/BackgroundManage/BackgroundManage.vue'),
            children: [{
                path: 'accountAuthority',
                name: 'accountAuthority',
                component: () => import('@/views/Index/BackgroundManage/AccountAuthority/AccountAuthority.vue')
            }, {
                path: 'activityManage',
                name: 'backActivityManage',
                component: () => import('@/views/Index/BackgroundManage/ActivityManage/ActivityManage.vue'),
                children: [
                    {
                        path: 'ActivityDetail/:activityId',
                        name: 'backActivityDetail',
                        component: () => import('@/views/Index/BusinessManage/activityManage/ActivityDetail/ActivityDetail.vue'),
                    }
                ]
            }, {
                path: 'feedbackManage',
                name: 'feedbackManage',
                component: () => import('@/views/Index/BackgroundManage/FeedbackManage/FeedbackManage.vue')
            }, {
                path: 'frontManage',
                name: 'frontManage',
                component: () => import('@/views/Index/BackgroundManage/FrontManage/FrontManage.vue')
            }, {
                path: 'orderAnalysis',
                name: 'orderAnalysis',
                component: () => import('@/views/Index/BackgroundManage/OrderAnalysis/OrderAnalysis.vue')
            }, {
                path: 'orderManage',
                name: 'orderManage',
                component: () => import('@/views/Index/BackgroundManage/OrderManage/OrderManage.vue'),
                children: [{
                    name: 'orderDetail',
                    path: ':orderId',
                    component: () => import('@/views/Index/BackgroundManage/OrderManage/OrderDetail/OrderDetail.vue')
                }]
            }, {
                path: 'userManage',
                name: 'userManage',
                component: () => import('@/views/Index/BackgroundManage/UserManage/UserManage.vue'),
                children: [{
                    path: 'userDetail/:id',
                    name: 'userDetail',
                    component: () => import('@/views/Index/BackgroundManage/UserManage/UserDetail/UserDetail.vue')
                }]
            }]
        }]
    },
];

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
});

export default router

