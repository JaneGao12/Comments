import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Login",
        component: () =>
            import ("../views/login/login.vue")
    },
    {
        path: "/home",
        name: "Home",
        component: () =>
            import ("../views/home/index.vue"),
        // meta: { requireAuth: true }
    }
];

const router = new VueRouter({
    // mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;