class CurrentProjectService {
  private static instance: CurrentProjectService;
  private currentProjectId: number | null = null;

  private constructor() {
    this.loadCurrentProject();
  }

  public static getInstance(): CurrentProjectService {
    if (!CurrentProjectService.instance) {
      CurrentProjectService.instance = new CurrentProjectService();
    }
    return CurrentProjectService.instance;
  }

  public setCurrentProject(projectId: number): void {
    this.currentProjectId = projectId;
    localStorage.setItem('currentProject', projectId.toString());
  }

  public getCurrentProject(): number | null {
    return this.currentProjectId;
  }

  private loadCurrentProject(): void {
    const projectId = localStorage.getItem('currentProject');
    if (projectId) {
      this.currentProjectId = parseInt(projectId);
    }
  }

  public clearCurrentProject(): void {
    this.currentProjectId = null;
    localStorage.removeItem('currentProject');
  }

  
}

export default CurrentProjectService.getInstance();