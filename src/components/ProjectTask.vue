<template>
    <div class="min-h-screen bg-gray-100 py-10">
        <div class="container mx-auto max-w-7xl">
            <h1 class="text-4xl font-bold text-center text-gray-800 mb-10">Project Tasks</h1>

            <SelectCurrentProject />
            <SelectCurrentStory />
            
            <div class="flex justify-end mb-6">
                <button @click="toggleModal"
                    class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
                    Add New Task
                </button>
            </div>

            <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div class="bg-white p-8 rounded-lg">
                    <h3 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit Task' : 'Add New Task' }}</h3>
                    <form @submit.prevent="isEditing ? updateTask() : addTask()">
                        <!-- Task fields -->
                        <div class="space-y-4">
                            <div>
                                <label for="task-name" class="block text-sm font-medium text-gray-700">Task Name</label>
                                <input type="text" id="task-name" v-model="newTask.name" required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                            </div>
                            <div>
                                <label for="task-description"
                                    class="block text-sm font-medium text-gray-700">Description</label>
                                <textarea id="task-description" v-model="newTask.description" required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                            </div>
                            <div>
                                <label for="task-priority" class="block text-sm font-medium text-gray-700">Priority</label>
                                <select id="task-priority" v-model="newTask.priority" required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                    <option value="" disabled>Select priority</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div>
                                <label for="task-status" class="block text-sm font-medium text-gray-700">Status</label>
                                <select id="task-status" v-model="newTask.status" required
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                    <option value="" disabled>Select status</option>
                                    <option value="Todo">Todo</option>
                                    <option value="Doing">Doing</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                            <!-- Add other fields as necessary -->
                        </div>
                        <!-- Form actions -->
                        <div class="mt-6 flex justify-end">
                            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
                                {{ isEditing ? 'Save Changes' : 'Add Task' }}
                            </button>
                            <button type="button" @click="toggleModal"
                                class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div v-if="detailedTask" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div class="bg-white p-10 rounded-lg shadow-md max-w-md mx-auto">
                    <h3 class="text-xl font-bold mb-4">Task Details</h3>
                    <div>
                        <h4 class="text-lg font-semibold">Name: {{ detailedTask.name }}</h4>
                        <p>Description: {{ detailedTask.description }}</p>
                        <p>Priority: {{ detailedTask.priority }}</p>
                        <p v-if="detailedTask.assignedUserId " >Assigned to: {{ detailedTask.assignedUserId }} </p>
                        <p>Estimated Hours: {{ detailedTask.estimatedTime }}</p>
                    </div>
                    <button @click="detailedTask = undefined"
                        class="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">Close</button>
                </div>
            </div>
            <div class="flex flex-row justify-between space-x-4">
                <div class="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
                    <h2 class="text-2xl font-semibold mb-4">To Do Tasks</h2>
                    <ul class="space-y-3">
                        <li v-for="task in todoTasks" :key="task.id"
                            class="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900">{{ task.name }}</h3>
                                <p class="text-gray-600">Priority: {{ task.priority }}</p>
                                <p v-if="task.assignedUserId" class="text-gray-600">Assigned to: {{ task.assignedUserId }}
                                </p>
                                <p class="text-gray-600">Estimated Hours: {{ task.estimatedTime }}</p>
                            </div>
                            <div class="flex flex-col items-center justify-between">
                                <div class="flex mb-2">
                                    <button @click="editTask(task)"
                                        class="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg focus:outline-none mr-2">Edit</button>
                                    <button @click="deleteTask(task.id)"
                                        class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg focus:outline-none">Delete</button>
                                </div>
                                <button @click="showDetails(task)"
                                    class="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg focus:outline-none">See
                                    details</button>
                            </div>


                        </li>
                        <li v-if="todoTasks.length === 0" class="text-center text-gray-500">No tasks found.</li>
                    </ul>
                </div>

                <div class="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
                    <h2 class="text-2xl font-semibold mb-4">Doing Tasks</h2>
                    <ul class="space-y-3">
                        <li v-for="task in doingTasks" :key="task.id"
                            class="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900">{{ task.name }}</h3>
                                <p class="text-gray-600">Priority: {{ task.priority }}</p>
                                <p v-if="task.assignedUserId" class="text-gray-600">Assigned to: {{ task.assignedUserId }}
                                </p>
                                <p class="text-gray-600">Estimated Hours: {{ task.estimatedTime }}</p>
                            </div>
                            <div class="flex flex-col items-center justify-between">
                                <div class="flex mb-2">
                                    <button @click="editTask(task)"
                                        class="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg focus:outline-none mr-2">Edit</button>
                                    <button @click="deleteTask(task.id)"
                                        class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg focus:outline-none">Delete</button>
                                </div>
                                <button @click="showDetails(task)"
                                    class="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg focus:outline-none">See
                                    details</button>
                            </div>
                        </li>
                        <li v-if="doingTasks.length === 0" class="text-center text-gray-500">No tasks found.</li>
                    </ul>
                </div>

                <div class="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
                    <h2 class="text-2xl font-semibold mb-4">Done Tasks</h2>
                    <ul class="space-y-3">
                        <li v-for="task in doneTasks" :key="task.id"
                            class="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900">{{ task.name }}</h3>
                                <p class="text-gray-600">Priority: {{ task.priority }}</p>
                                <p v-if="task.assignedUserId" class="text-gray-600">Assigned to: {{ task.assignedUserId }}
                                </p>
                                <p class="text-gray-600">Estimated Hours: {{ task.estimatedTime }}</p>
                            </div>
                            <div class="flex flex-col items-center justify-between">
                                <div class="flex mb-2">
                                    <button @click="editTask(task)"
                                        class="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg focus:outline-none mr-2">Edit</button>
                                    <button @click="deleteTask(task.id)"
                                        class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg focus:outline-none">Delete</button>
                                </div>
                                <button @click="showDetails(task)"
                                    class="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg focus:outline-none">See
                                    details</button>
                            </div>
                        </li>
                        <li v-if="doneTasks.length === 0" class="text-center text-gray-500">No tasks found.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import SelectCurrentProject from './SelectCurrentProject.vue';
import { Task } from '../models/Task';
import { ProjectTaskService } from '../services/projectTask-service';
import SelectCurrentStory from './SelectCurrentStory.vue';
import { selectedStoryId, tasks } from '../reactive/refs';

const isModalOpen = ref(false);
const isEditing = ref(false);
const detailedTask = ref<Task>();
const newTask = ref<Task>({
    id: Date.now(), 
    name: '',
    description: '',
    priority: 'Medium',
    storyId: 0, 
    estimatedTime: 0,
    status: 'Todo',
    creationDate: new Date(),
});

onMounted(() => {
    tasks.value = ProjectTaskService.getTasksByStory(selectedStoryId.value as number)
});

const todoTasks = computed(() =>
    tasks.value.filter((task) => task.status === "Todo")
);

const doingTasks = computed(() =>
    tasks.value.filter((task) => task.status === "Doing")
);

const doneTasks = computed(() =>
    tasks.value.filter((task) => task.status === "Done")
);

const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
    if (!isModalOpen.value) {
        resetForm();
    }
};

const showDetails = (task: Task) => {
    detailedTask.value = task;
};

const addTask = () => {
    ProjectTaskService.addTask(newTask.value);
    tasks.value = ProjectTaskService.getTasksByStory(selectedStoryId.value as number); 
    toggleModal();
};

const updateTask = () => {
    ProjectTaskService.updateTask(newTask.value);
    tasks.value = ProjectTaskService.getTasksByStory(selectedStoryId.value as number); 
    toggleModal();
};

const editTask = (task: Task) => {
    newTask.value = { ...task };
    isEditing.value = true;
    toggleModal();
};

const deleteTask = (taskId: number) => {
    ProjectTaskService.deleteTask(taskId);
    tasks.value = ProjectTaskService.getTasksByStory(selectedStoryId.value as number);
};

const resetForm = () => {
    newTask.value = {
        id: Date.now(),
        name: '',
        description: '',
        priority: 'Medium',
        storyId: 0,
        estimatedTime: 0,
        status: 'Todo',
        creationDate: new Date(),
    };
    isEditing.value = false;
};
</script>