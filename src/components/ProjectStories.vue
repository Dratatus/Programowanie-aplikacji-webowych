<template>
  <div class="min-h-screen bg-gray-100 py-10">
    <div class="container mx-auto max-w-4xl">
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-10">Project Stories</h1>
      
      <div class="flex justify-end mb-6">
        <button @click="createNewStory" class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
          Add New Story
        </button>
      </div>
      
      <div class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-5">Stories List</h2>
        <ul class="space-y-3">
          <li v-for="story in stories" :key="story.id" class="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ story.name }}</h3>
              <p class="text-gray-600">{{ story.description }}</p>
            </div>
            <div>
              <button @click="editStory(story)" class="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg focus:outline-none mr-2">
                Edit
              </button>
              <button @click="deleteStory(story.id)" class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg focus:outline-none">
                Delete
              </button>
            </div>
          </li>
          <li v-if="stories.length === 0" class="text-center text-gray-500">No stories found.</li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CurrentProjectService from '../services/currentProject-service';
import { ProjectStoryService } from '../services/projectStory-service';
import { ProjectStory } from '../models/projectStory';

const stories = ref<ProjectStory[]>([]);

onMounted(() => {
  const currentProjectId = CurrentProjectService.getCurrentProject()
  if (currentProjectId) {
    stories.value = ProjectStoryService.loadStoriesForProject(currentProjectId);
  }
});

const createNewStory = () => {
};

const editStory = (story: ProjectStory) => {
  ProjectStoryService.updateStory(story);
  stories.value = stories.value.filter((story) => story.id !== story.id);
};

const deleteStory = (storyId: number) => {
  ProjectStoryService.deleteStory(storyId);
  stories.value = stories.value.filter((story) => story.id !== storyId);
};
</script>
  