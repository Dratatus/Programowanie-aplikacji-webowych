import  ProjectManager  from "../components/ProjectManager.vue"
import { createRouter, createWebHistory } from 'vue-router'
import ProjectStories from "../components/ProjectStories.vue";
import ProjectTask from "../components/ProjectTask.vue";
import LoginPage from "../components/Login/LoginPage.vue";

const routes = [
  { path: '/', component: ProjectManager },
  { path: '/stories', component: ProjectStories },
  { path: '/tasks', component: ProjectTask },
  { path: '/login', component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;