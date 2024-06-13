import  ProjectManager  from "../components/ProjectManager.vue"
import { createRouter, createWebHistory } from 'vue-router'
import ProjectStories from "../components/ProjectStories.vue";
import ProjectTask from "../components/ProjectTask.vue";
import LoginPage from "../pages/Login/LoginPage.vue";
import RegisterPage from "../pages/Login/registerPage.vue";

const routes = [
  { path: '/', component: ProjectManager },
  { path: '/stories', component: ProjectStories },
  { path: '/tasks', component: ProjectTask },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;