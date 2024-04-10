<template>
    <div class="w-full max-w-xs">
        <label for="listbox" class="block text-sm font-medium leading-6 text-gray-900">Select a Story</label>
        <div class="relative mt-1">
            <button type="button"
                class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="block truncate">{{ selectedStoryName }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none"
                        stroke="currentColor">
                        <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
                    </svg>
                </span>
            </button>

            <select v-model="selectedStoryId" @change="setCurrentStory"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                <option value="" disabled>Select story</option>
                <option v-for="story in stories" :key="story.id" :value="story.id">
                    {{ story.name }}
                </option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import CurrentProjectService from '../services/currentProject-service';
import CurrentStoryService from '../services/currentStory-service'; 
import { ProjectService } from '../services/project-service';
import { Project } from '../models/project';
import { selectedProjectId } from '../reactive/refs';
import { selectedStoryId } from '../reactive/refs'; 
import { ProjectStory } from '../models/projectStory';
import { ProjectStoryService } from '../services/projectStory-service';

const projects = ref<Project[]>([]);
const stories = ref<ProjectStory[]>([]); 
const selectedProjectName = ref('Select project');
const selectedStoryName = ref('Select story');


const refreshProjectsAndStories = async () => {
    projects.value = await ProjectService.loadProjects();
    stories.value = await ProjectStoryService.loadStories();

    if (selectedProjectId.value) {
        const project = projects.value.find(p => p.id === selectedProjectId.value);
        const story = stories.value.find(s => s.id === selectedStoryId.value);

        selectedProjectName.value = project ? project.name : 'Select project';
        selectedStoryName.value = story?.name as string 
        
        stories.value = await ProjectStoryService.loadStoriesForProject(selectedProjectId.value);
    }
};

onMounted(() => {
    const savedProjectId = localStorage.getItem('selectedProjectId');
    const savedStoryId = localStorage.getItem('selectedStoryId'); 
    if (savedProjectId) {
        selectedProjectId.value = Number(savedProjectId);
    }
    if (savedStoryId) {
        selectedStoryId.value = Number(savedStoryId);
    }
    refreshProjectsAndStories();
});

watch(selectedProjectId, (newVal) => {
    if (newVal) {
        localStorage.setItem('selectedProjectId', newVal.toString());
        CurrentProjectService.setCurrentProject(newVal);
        refreshProjectsAndStories();
    } else {
        selectedProjectName.value = 'Select project';
    }
});

watch(selectedStoryId, (newVal) => {
    if (newVal) {
        localStorage.setItem('selectedStoryId', newVal.toString());
        CurrentStoryService.setCurrentStory(newVal);
        const story = stories.value.find(s => s.id === newVal);
        selectedStoryName.value = story ? story.name : 'Select story';
    } else {
        selectedStoryName.value = 'Select story';
    }
});

const setCurrentStory = () => {
    if (selectedStoryId.value) {
        CurrentStoryService.setCurrentStory(selectedStoryId.value);
        const story = stories.value.find(s => s.id === selectedStoryId.value);
        selectedStoryName.value = story ? story.name : 'Select story';
        // Jeśli masz zamiar odświeżyć inne dane po zmianie historii, tutaj dodaj logikę
    } else {
        selectedStoryName.value = 'Select story';
        // Upewnij się, że przy braku wyboru czyszczona jest odpowiednia wartość w localStorage
        localStorage.removeItem('selectedStoryId');
        CurrentStoryService.clearCurrentStory();
    }
};
</script>

