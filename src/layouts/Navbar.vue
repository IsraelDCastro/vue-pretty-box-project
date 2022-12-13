<template>
  <div class="navbar-wrap">
    <nav class="navbar is-sticky is-underline">
      <div class="logo">
        <router-link to="/">Vue PrettyBox</router-link>
      </div>
      <ul class="menu">
        <li v-for="route in routes" :key="route.name">
          <router-link :to="route.path" class="nav-link" active-class="is-active">
            {{ route.name }}
          </router-link>
        </li>
      </ul>
      <span class="burger-menu">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </nav>
  </div>
</template>

<script setup>
import { routes } from "@/router";
</script>
