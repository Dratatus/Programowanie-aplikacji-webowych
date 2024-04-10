<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <!-- Navbar -->
    <nav class="bg-gray-800">
      <div class="max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <!-- Logo and navigation -->
          <div class="flex-1 flex items-center justify-start sm:items-stretch sm:justify-start">
            <div class="flex-shrink-0 flex items-center">
              <img class="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Workflow">
              <img class="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Workflow">
            </div>
            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4">
                <router-link to="/" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Project Manager</router-link>
                <router-link to="/stories" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Project Stories</router-link>
                <router-link to="/tasks" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Project Tasks</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow">
      <div class="py-6 lg:px-8 flex items-start">
        <div class="flex-1">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>


<style scoped>
html,
body {
  height: 100%;
  background-color: #f3f4f6;
}

</style>
