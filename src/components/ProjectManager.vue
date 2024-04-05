<template>
  <div class="min-h-screen bg-gray-100 py-10">
    <div class="container mx-auto max-w-4xl">
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-10">Projects Manager</h1>
      
      <div class="bg-white p-8 rounded-lg shadow-md mb-6">
        <h2 class="text-2xl font-semibold mb-5">Add/Edit Project</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <input type="hidden" v-model="editableProject.id">
          <div>
            <label for="name" class="block text-gray-700 font-medium mb-1">Project Name:</label>
            <input v-model="editableProject.name" id="name" type="text" required class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          
          <div>
            <label for="desc" class="block text-gray-700 font-medium mb-1">Description:</label>
            <textarea v-model="editableProject.desc" id="desc" required class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500" rows="4"></textarea>
          </div>
          
          <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
            {{ editableProject.id ? 'Update' : 'Add' }}
          </button>
        </form>
      </div>
      
      <div class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-5">Projects List</h2>
        <ul class="space-y-3">
          <li v-for="project in projects" :key="project.id" class="flex items-center justify-between">
            <span class="text-gray-700">{{ project.name }}</span>
            <div>
              <button @click="editProject(project)" class="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg focus:outline-none mr-2">Edit</button>
              <button @click="deleteProject(project.id)" class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg focus:outline-none">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

 
 
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ProjectService } from '../services/project-service';
import { Project } from '../models/project';

const projects = ref<Project[]>([]);
const editableProject = ref<Project>({ id: 0, name: '', desc: '' });

onMounted(() => {
  projects.value = ProjectService.loadProjects();
});

function submitForm() {
  if (editableProject.value.id) {
    ProjectService.updateProject(editableProject.value);
  } else {
    ProjectService.addProject({ ...editableProject.value, id: Date.now() });
  }
  projects.value = ProjectService.loadProjects();
  resetForm();
}

function editProject(project: Project) {
  editableProject.value = { ...project };
}

function deleteProject(id: number) {
  ProjectService.deleteProject(id);
  projects.value = ProjectService.loadProjects();
}

function resetForm() {
  editableProject.value = { id: 0, name: '', desc: '' };
}
</script>
