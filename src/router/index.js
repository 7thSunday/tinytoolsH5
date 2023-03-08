import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'homePage',
        component: () => import('../components/homePage.vue'),
        children: []
    },
    {
        path: '/loadBase',
        name: 'loadBase',
        component: () => import('../components/loadBase.vue'),
        children: []
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes 
})

export default router;