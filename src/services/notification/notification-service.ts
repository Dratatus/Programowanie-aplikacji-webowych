import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectNotification } from '../../models/notification/notification';

class NotificationService {
    private notificationsSubject: BehaviorSubject<ProjectNotification[]> = new BehaviorSubject<ProjectNotification[]>([]);
    private unreadCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
    send(notification: ProjectNotification): void {
      const currentNotifications = this.notificationsSubject.value;
      this.notificationsSubject.next([...currentNotifications, notification]);
      this.updateUnreadCount();
    }
  
    list(): Observable<ProjectNotification[]> {
      return this.notificationsSubject.asObservable();
    }
  
    unreadCount(): Observable<number> {
      return this.unreadCountSubject.asObservable();
    }
  
    private updateUnreadCount(): void {
      const unreadCount = this.notificationsSubject.value.filter(notification => !notification.read).length;
      this.unreadCountSubject.next(unreadCount);
    }
  
    markAsRead(index: number): void {
      const notifications = this.notificationsSubject.value;
      if (notifications[index]) {
        notifications[index].read = true;
        this.notificationsSubject.next(notifications);
        this.updateUnreadCount();
      }
    }
  }
  
  export const notificationService = new NotificationService();