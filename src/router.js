import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomePage
        },

        // {
        //     path: "/projects/:slug",
        //     name: "single-projects",
        //     component: SingleProjectPage
        // },

        // PAGINA DI ERRORE
        // {
        //     path: "/:pathMatch(.*)*",
        //     name: "not-found",
        //     component: NotFound
        // },

    ]
});

export { router };