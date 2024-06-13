<template>
    <div v-if="visible" class="notification-dialog">
      <div v-for="(notif, index) in notifications" :key="index" v-if="notif.priority !== 'low'">
        <h3>{{ notif.title }}</h3>
        <p>{{ notif.message }}</p>
        <button @click="markAsRead(index)">Mark as read</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { notificationService } from '../services/notification/notification-service';
  import { ProjectNotification } from '../models/notification/notification';
  
  export default defineComponent({
    name: 'NotificationDialog',
    setup() {
      const notifications = ref<ProjectNotification[]>([]);
      const visible = ref(false);
  
      onMounted(() => {
        notificationService.list().subscribe(list => {
          notifications.value = list.filter(notif => notif.priority === 'medium' || notif.priority === 'high');
          visible.value = notifications.value.length > 0;
        });
      });
  
      const markAsRead = (index: number) => {
        notificationService.markAsRead(index);
        visible.value = notifications.value.some(notif => notif.priority === 'medium' || notif.priority === 'high');
      };
  
      return {
        notifications,
        visible,
        markAsRead,
      };
    },
  });
  </script>
  
  <style>
  .notification-dialog {
    position: fixed;
    top: 10px;
    right: 10px;
    background: white;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  
  <style>
  .notification-dialog {
    position: fixed;
    top: 10px;
    right: 10px;
    background: white;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  
  