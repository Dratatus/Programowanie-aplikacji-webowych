<template>
    <div>
      <h1>Projects List</h1>
      <ul>
        <li v-for="project in projects" :key="project.id">
          {{ project.name }} - <router-link :to="'/project/' + project.id">Details</router-link>
        </li>
      </ul>
      <router-link to="/project/new">Add New Project</router-link>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { ProjectService } from '../services/project-service';
import { Project } from '../models/project';
  
  const projects = ref<Project[]>([]);
  
  onMounted(() => {
    projects.value = ProjectService.loadProjects();
  });
  </script>
  