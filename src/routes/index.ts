import { createRouter, createWebHistory } from 'vue-router';
import ProjectManager from "../components/ProjectManager.vue";
import ProjectStories from "../components/ProjectStories.vue";
import ProjectTask from "../components/ProjectTask.vue";
import LoginPage from "../pages/Login/LoginPage.vue";
import RegisterPage from "../pages/Login/registerPage.vue";
import { loggedUser } from '../reactive/refs'; 

const routes = [
  { path: '/', component: ProjectManager, meta: { requiresAuth: true } },
  { path: '/stories', component: ProjectStories, meta: { requiresAuth: true } },
  { path: '/tasks', component: ProjectTask, meta: { requiresAuth: true } },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = loggedUser.value !== null; 
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;