<template>
    <div>
        <h2>Select a Project</h2>
        <select v-model="selectedProjectId" @change="setCurrentProject">
            <option value="" disabled>Select project</option>
            <option v-for="project in projects" :key="project.id" :value="project.id">
                {{ project.name }}
            </option>
        </select>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CurrentProjectService from '../services/currentProject-service';
import { ProjectService } from '../services/project-service';
import { Project } from '../models/project';

const selectedProjectId = ref(null);
const projects = ref<Project[]>([]);

onMounted(() => {
    projects.value = ProjectService.loadProjects();
});

const setCurrentProject = () => {
    if (selectedProjectId.value) {
        CurrentProjectService.setCurrentProject(selectedProjectId.value);
    }
};
</script>