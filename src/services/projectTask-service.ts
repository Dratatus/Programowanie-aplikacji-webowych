import { Task } from "../models/Task";


export class ProjectTaskService {
    static loadTasks(): Task[] {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    static saveTasks(tasks: Task[]): void {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static addTask(task: Task): void {
        const tasks = this.loadTasks();
        task.id = new Date().getTime(); 
        task.creationDate = new Date();
        tasks.push(task);
        this.saveTasks(tasks);
    }

    static updateTask(updatedTask: Task): void {
        let tasks = this.loadTasks();
        const index = tasks.findIndex((task) => task.id === updatedTask.id);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...updatedTask };
            if (updatedTask.status === 'Doing') {
                tasks[index].startDate = new Date();
            }
            if (updatedTask.status === 'Done') {
                tasks[index].endDate = new Date();
            }
            this.saveTasks(tasks);
        }
    }

    static deleteTask(taskId: number): void {
        const tasks = this.loadTasks().filter((task) => task.id !== taskId);
        this.saveTasks(tasks);
    }

    static getTasksByStory(storyId: number): Task[] {
        return this.loadTasks().filter((task) => task.storyId === storyId);
    }
}