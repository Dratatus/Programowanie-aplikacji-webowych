<template>
  <div class="min-h-screen bg-gray-100 py-10">
    <div class="container mx-auto max-w-7xl">
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-10">Projects Manager</h1>

      <div class="flex justify-end mb-6">
        <button @click="toggleModal()"
          class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
          Add New Project
        </button>
      </div>

      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-8 rounded-lg">
          <h3 class="text-xl font-bold mb-4">{{ editableProject.id ? 'Edit Project' : 'Add New Project' }}</h3>
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="project-name" class="block text-sm font-medium text-gray-700">Project Name</label>
              <input type="text" id="project-name" v-model="editableProject.name"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            </div>
            <div class="mb-4">
              <label for="project-description" class="block text-sm font-medium text-gray-700">Description</label>
              <textarea id="project-description" v-model="editableProject.desc"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
            </div>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              {{ editableProject.id ? 'Save Changes' : 'Add Project' }}
            </button>
            <button type="button" @click="toggleModal()"
              class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2">Cancel</button>
          </form>
        </div>
      </div>

      <div class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-5">Projects List</h2>
        <ul class="space-y-3">
          <li v-for="project in projects" :key="project.id" class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ project.name }}</h3>
              <p class="text-gray-600">{{ project.desc }}</p>
            </div>
            <div>
              <button @click="editProject(project)"
                class="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg focus:outline-none mr-2">Edit</button>
              <button @click="deleteProject(project.id)"
                class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg focus:outline-none">Delete</button>
            </div>
          </li>
          <li v-if="projects.length === 0" class="text-center text-gray-500">No projects found.</li>
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
const isModalOpen = ref(false);
const editableProject = ref<Project>({ id: 0, name: '', desc: '' });

onMounted(async () => {
  projects.value = await ProjectService.loadProjects();
});

function toggleModal() {
  isModalOpen.value = !isModalOpen.value;
}

async function submitForm() {
  if (editableProject.value.id) {
    await ProjectService.updateProject(editableProject.value);
  } else {
    await ProjectService.addProject({ ...editableProject.value, id: Date.now() });
  }
  projects.value = await ProjectService.loadProjects();
  toggleModal();
  resetForm();
}

async function editProject(project: Project) {
  editableProject.value = { ...project };
  toggleModal();
}

async function deleteProject(id: number) {
  await ProjectService.deleteProject(id);
  projects.value = await ProjectService.loadProjects();
}

function resetForm() {
  editableProject.value = { id: 0, name: '', desc: '' };
}
</script>

