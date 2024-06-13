<template>
    <div>
        <h2>Notifications</h2>
        <ul>
            <li v-for="(notification, index) in notifications" :key="index">
                <div>
                    <h3>{{ notification.title }}</h3>
                    <p>{{ notification.message }}</p>
                    <small>{{ notification.date }}</small>
                    <button @click="markAsRead(index)">Mark as read</button>
                </div>
            </li>
        </ul>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { notificationService } from '../services/notification/notification-service';
import { ProjectNotification } from '../models/notification/notification'

export default defineComponent({
    name: 'NotificationsList',
    setup() {
        const notifications = ref<ProjectNotification[]>([]);

        onMounted(() => {
            notificationService.list().subscribe(list => {
                notifications.value = list;
            });
        });

        const markAsRead = (index: number) => {
            notificationService.markAsRead(index);
        };

        return {
            notifications,
            markAsRead,
        };
    },
});
</script>
  