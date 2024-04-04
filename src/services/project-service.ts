import { Project } from "../models/project"

export class ProjectService {
    static saveProjects(projects: Project[]) {
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    static loadProjects(): Project[] {
        const projects = localStorage.getItem('projects');
        return projects ? JSON.parse(projects) : [];
    }

    static addProject(project: Project) {
        const projects = this.loadProjects();
        projects.push({ ...project, id: new Date().getTime() });
        this.saveProjects(projects);
    }

    static updateProject(updatedProject: Project) {
        let projects = this.loadProjects();
        projects = projects.map(project => project.id === updatedProject.id ? updatedProject : project);
        this.saveProjects(projects);
    }

    static deleteProject(id: number) {
        let projects = this.loadProjects();
        projects = projects.filter(project => project.id !== id);
        this.saveProjects(projects);
    }
}