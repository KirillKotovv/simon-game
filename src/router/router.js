import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name:'main',
            component: () => import('@/app/MainWrapper'),
            redirect:'/game',
            children:[
                {
                    path: '/game',
                    name:'game',
                    component: () => import('@/app/game/SimonGame'),
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        }],
});

export default router

