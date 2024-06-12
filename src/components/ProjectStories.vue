<template>
  <div class="min-h-screen bg-gray-100 py-10">
    <div class="container mx-auto max-w-7xl">
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-10">Project Stories</h1>

      <SelectCurrentProject />

      <div class="flex justify-end mb-6">
        <button @click="toggleModal()"
          class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
          Add New Story
        </button>
      </div>


      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-8 rounded-lg">
          <h3 class="text-xl font-bold mb-4">Add New Story</h3>
          <form @submit.prevent="isEditing ? updateStory() : addStory()">
            <div class="mb-4">
              <label for="story-name" class="block text-sm font-medium text-gray-700">Story Name</label>
              <input type="text" id="story-name" v-model="newStory.name"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            </div>
            <div class="mb-4">
              <label for="story-description" class="block text-sm font-medium text-gray-700">Description</label>
              <textarea id="story-description" v-model="newStory.description"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
            </div>
            <div class="mb-4">
              <label for="story-priority" class="block text-sm font-medium text-gray-700">Priority</label>
              <select id="story-priority" v-model="newStory.priority"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="" disabled>Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="story-state" class="block text-sm font-medium text-gray-700">State</label>
              <select id="story-state" v-model="newStory.state"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="" disabled>Select state</option>
                <option value="todo">To Do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </div>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              {{ isEditing ? 'Save Changes' : 'Add Story' }}
            </button>
            <button type="button" @click="toggleModal()"
              class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2">Cancel</button>
          </form>
        </div>
      </div>

      <div class="flex flex-row justify-between space-x-4">
        <div class="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-4">ToDo Stories</h2>
          <ul class="space-y-3">
            <li v-for="story in todoStories" :key="story.id"
              class="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Name: {{ story.name }}</h3>
                <p class="text-gray-600">Description: {{ story.description }}</p>
                <p class="text-gray-600">Priority: {{ story.priority }}</p>
                <p class="text-gray-600">Statte: {{ story.state }}</p>
              </div>
              <div>
                <button @click="editStory(story)"
                  class="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg focus:outline-none mr-2">
                  Edit
                </button>
                <button @click="deleteStory(story.id)"
                  class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg focus:outline-none">
                  Delete
                </button>
              </div>
            </li>
            <li v-if="todoStories.length === 0" class="text-center text-gray-500">No stories found.</li>
          </ul>
        </div>

        <div class="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-4">During Stories</h2>
          <ul class="space-y-3">
            <li v-for="story in doingStories" :key="story.id"
              class="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Name: {{ story.name }}</h3>
                <p class="text-gray-600">Description: {{ story.description }}</p>
                <p class="text-gray-600">Priority: {{ story.priority }}</p>
                <p class="text-gray-600">Statte: {{ story.state }}</p>
              </div>
              <div>
                <button @click="editStory(story)"
                  class="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg focus:outline-none mr-2">
                  Edit
                </button>
                <button @click="deleteStory(story.id)"
                  class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg focus:outline-none">
                  Delete
                </button>
              </div>
            </li>
            <li v-if="doingStories.length === 0" class="text-center text-gray-500">No stories found.</li>
          </ul>
        </div>

        <div class="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Done Stories</h2>
          <ul class="space-y-3">
            <li v-for="story in doneStories" :key="story.id"
              class="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Name: {{ story.name }}</h3>
                <p class="text-gray-600">Description: {{ story.description }}</p>
                <p class="text-gray-600">Priority: {{ story.priority }}</p>
                <p class="text-gray-600">Statte: {{ story.state }}</p>
                <p class="text-gray-600">Created: {{ story.creationDate }}</p>
              </div>
              <div>
                <button @click="editStory(story)"
                  class="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg focus:outline-none mr-2">
                  Edit
                </button>
                <button @click="deleteStory(story.id)"
                  class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg focus:outline-none">
                  Delete
                </button>
              </div>
            </li>
            <li v-if="doneStories.length === 0" class="text-center text-gray-500">No stories found.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import CurrentProjectService from '../services/currentProject-service';
import { ProjectStoryService } from '../services/projectStory-service';
import { ProjectStory, Priority, StoryState } from '../models/projectStory';
import { selectedProjectId } from '../reactive/refs';
import SelectCurrentProject from '../components/SelectCurrentProject.vue';

const stories = ref<ProjectStory[]>([]);
const isModalOpen = ref(false);
const isEditing = ref(false);
const editableStory = ref<ProjectStory | null>(null);

const newStory = ref<ProjectStory>({
  id: Date.now(),
  name: '',
  description: '',
  priority: '' as Priority,
  projectId: selectedProjectId.value as number,
  creationDate: new Date(),
  state: '' as StoryState,
  ownerId: 1,
});

onMounted(async () => {
  selectedProjectId.value = CurrentProjectService.getCurrentProjectId();
  if (selectedProjectId.value) {
    stories.value = await ProjectStoryService.loadStoriesForCurrentProject();
  }
});

const todoStories = computed(() =>
  stories.value.filter((story) => story.state === 'todo')
);

const doingStories = computed(() =>
  stories.value.filter((story) => story.state === 'doing')
);

const doneStories = computed(() =>
  stories.value.filter((story) => story.state === 'done')
);

watch(selectedProjectId, async (newId) => {
  if (newId) {
    stories.value = await ProjectStoryService.loadStoriesForCurrentProject();
  } else {
    stories.value = [];
  }
});


const toggleModal = (story: ProjectStory | null = null) => {
  if (story) {
    isEditing.value = true;
    editableStory.value = { ...story };
  } else {
    isEditing.value = false;
    editableStory.value = null;
  }
  isModalOpen.value = !isModalOpen.value;
};

const addStory = async () => {
  if (!selectedProjectId.value) {
    alert("Please select a project first.");
    return;
  }

  const projectId = selectedProjectId.value!;
  const storyData = newStory.value;

  if (!storyData.name || !storyData.description) {
    alert("Please fill out all the fields.");
    return;
  }

  const storyToAdd = {
    ...storyData,
    id: Date.now(),
    projectId: projectId,
    priority: storyData.priority || 'medium',
    state: storyData.state || 'todo',
    ownerId: 1,
    creationDate: new Date(),
  };

  await ProjectStoryService.createStory(storyToAdd);

  stories.value = await ProjectStoryService.loadStoriesForCurrentProject();
  toggleModal();
};


const updateStory = async () => {

  const projectId = selectedProjectId.value!;
  const storyData = newStory.value;

  if (isEditing.value && editableStory.value && editableStory.value.id) {
    await ProjectStoryService.updateStory({ ...editableStory.value, ...storyData, projectId: projectId });
  }
  else {
    alert("Something went wrong with story update")
  }

  stories.value = await ProjectStoryService.loadStoriesForCurrentProject();
  toggleModal()
}

const editStory = (story: ProjectStory) => {
  newStory.value = { ...story };
  isEditing.value = true;
  toggleModal(newStory.value);
};

const deleteStory = async (storyId: number) => {
  await ProjectStoryService.deleteStory(storyId);
  stories.value = await ProjectStoryService.loadStoriesForCurrentProject();
};
</script>

  