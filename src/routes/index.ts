import  ProjectsList  from "../components/ProjectManager.vue"
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: ProjectsList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;