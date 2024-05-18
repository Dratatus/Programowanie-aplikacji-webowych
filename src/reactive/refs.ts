import { ref } from 'vue';
import { Task } from '../models/Task';

export const selectedProjectId = ref<number | null>(null);
export const selectedStoryId = ref<number | null>(null);
export const tasks = ref<Task[]>([]);