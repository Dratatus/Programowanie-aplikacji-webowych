<template>
    <div>
      <h2>Project Stories</h2>
      <button @click="createNewStory">Add New Story</button>
      <div v-for="story in stories" :key="story.id">
        <h3>{{ story.name }}</h3>
        <p>{{ story.description }}</p>
        <!-- Buttons for editing and deleting a story -->
        <button @click="editStory(story)">Edit</button>
        <button @click="deleteStory(story.id)">Delete</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import CurrentProjectService from '../services/currentProject-service';
  import { ProjectHistoryService } from '../services/ProjectHistoryService';
  
  const stories = ref([]);
  
  onMounted(() => {
    const currentProjectId = CurrentProjectService.getCurrentProject();
    if (currentProjectId) {
      stories.value = ProjectHistoryService.loadStoriesForProject(currentProjectId);
    }
  });
  
  const createNewStory = () => {
    // Logic for creating a new story
  };
  
  const editStory = (story) => {
    // Logic for editing a story
  };
  
  const deleteStory = (storyId) => {
    ProjectHistoryService.deleteStory(storyId);
    stories.value = stories.value.filter((story) => story.id !== storyId);
  };
  </script>
  