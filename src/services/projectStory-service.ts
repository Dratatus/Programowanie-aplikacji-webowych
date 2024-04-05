import { ProjectStory, StoryState } from '../models/projectStory';

export class ProjectStoryService {
  private static loadStories(): ProjectStory[] {
    const stories = localStorage.getItem('projectHistories');
    return stories ? JSON.parse(stories) : [];
  }

  private static saveStories(stories: ProjectStory[]): void {
    localStorage.setItem('projectHistories', JSON.stringify(stories));
  }

  public static loadStoriesForProject(projectId: number): ProjectStory[] {
    return this.loadStories().filter(story => story.projectId === projectId);
  }

  public static createStory(story: ProjectStory): void {
    const stories = this.loadStories();
    story.id = new Date().getTime(); 
    story.creationDate = new Date(); 
    stories.push(story);
    this.saveStories(stories);
  }

  public static updateStory(updatedStory: ProjectStory): void {
    let stories = this.loadStories();
    const index = stories.findIndex(story => story.id === updatedStory.id);
    if (index !== -1) {
      stories[index] = updatedStory;
      this.saveStories(stories);
    }
  }

  public static deleteStory(storyId: number): void {
    let stories = this.loadStories();
    stories = stories.filter(story => story.id !== storyId);
    this.saveStories(stories);
  }

  public static updateStoryState(storyId: number, newState: StoryState): void {
    let stories = this.loadStories();
    const index = stories.findIndex(story => story.id === storyId);
    if (index !== -1) {
      stories[index].state = newState;
      this.saveStories(stories);
    }
  }
}
