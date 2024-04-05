import  ProjectManager  from "../components/ProjectManager.vue"
import { createRouter, createWebHistory } from 'vue-router'
import ProjectStories from "../components/ProjectStories.vue";

const routes = [
  { path: '/', component: ProjectManager },
  { path: '/stories', component: ProjectStories },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;