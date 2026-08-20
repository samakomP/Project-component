<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/Auth'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const authStore = useAuthStore()

const isAdmin = computed(() => authStore.user?.role === 'admin')
const homeRoute = computed(() => isAdmin.value ? 'admin-home-view' : 'userhome-view')
</script>

<template>

        <router-link :to="{ name: homeRoute, params: { id: user?.id } }"
            class="self-start bg-[#FCC084] text-[#003366] font-bold text-lg px-6 py-2 rounded-full hover:opacity-80 transition">
            &larr; Home
        </router-link>

</template>
