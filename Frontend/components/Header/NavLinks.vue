<template>
  <div class="navbar-item bc d-none d-xl-block d-lg-block py-0">
    <NuxtLink :to="link.Link" v-for="(link, idx) in navLinks" :id="idx">{{ link.name }}</NuxtLink>
  </div>
</template>

<script setup lang="ts">

const navLinks = [
  {
    name: 'Anasayfa',
    Link: '/'
  },
  {
    name: 'Ürünler',
    Link: '/products'
  },
  {
    name: 'İletişim',
    Link: '/contact'
  }
];
</script>