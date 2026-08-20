<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

</script>

<template>

        <router-link :to="{ name: 'userhome-view', params: { id: user?.id } }"
            class="self-start bg-[#FCC084] text-[#003366] font-bold text-lg px-6 py-2 rounded-full hover:opacity-80 transition">
            &larr; Home
        </router-link>

</template>
