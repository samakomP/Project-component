<script setup lang="ts">
import { RouterLink, RouterView , useRoute,} from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const route = useRoute()
const store = useMessageStore()
const { message } = storeToRefs(store)


</script>

<template>
  <header v-if="route.name !== 'login-view' && route.name !== 'register-view' ">
   <div class="wrapper">
      <nav>
        <h2>{{ route.name }}</h2>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <div id="flashMessage" v-if="message" class=" fixed top-3 left-1/2 -translate-x-1/2 w-fit z-50 shadow-md rounded-3xl px-3 py-2">
        <h4 class="text-center px-2 font-meduim text-gray-800">{{ message }}</h4>
      </div>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

@keyframes yellowFade {
  from {
    background-color: #FCC084;
  }
  to {
    background-color: transparent;
  }
}
#flashMessage {
  animation: yellowFade 3s ease-in-out;
}
</style>
