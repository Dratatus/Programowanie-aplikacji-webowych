<template>
    <div @click="showNotifications">
        <span>Notifications ({{ unreadCount }})</span>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { notificationService } from '../services/notification/notification-service'

export default defineComponent({
    name: 'UnreadCount',
    setup() {
        const unreadCount = ref(0);

        onMounted(() => {
            notificationService.unreadCount().subscribe(count => {
                unreadCount.value = count;
            });
        });

        const showNotifications = () => {
        };

        return {
            unreadCount,
            showNotifications,
        };
    },
});
</script>
  