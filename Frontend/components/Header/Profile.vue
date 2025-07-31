
<template>
  <div class="user" @click="handleClick" style="position: relative;">
    <span class="navbar-brand py-0 pl-5 d-flex align-items-center gap-2">
      <img
      
        width="25"
        height="25"
        src="https://img.icons8.com/ultraviolet/40/gender-neutral-user.png"
        alt="gender-neutral-user"
        title="gender-neutral-user"
      />
      <span v-if="userName" style="font-size: 14px;">{{ userName }}</span>
    </span>

    <!-- Açılır Menü -->
    <div v-if="showDropdown" class="dropdown-menu show" style="position: absolute; top: 40px; right: 0;">
      <NuxtLink class="dropdown-item" to="/profile">Profilim</NuxtLink>
      <NuxtLink class="dropdown-item" to="/add-product">Ürün Sat</NuxtLink>
      <button class="dropdown-item" @click="logout">Çıkış Yap</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const userName = ref('')
const showDropdown = ref(false)
const router = useRouter()

onMounted(() => {
  const token = localStorage.getItem('token')
  const name = localStorage.getItem('userName')
  if (token && name) {
    userName.value = name
  }
})

const handleClick = () => {
  if (!localStorage.getItem('token')) {
    const modal = new bootstrap.Modal(document.getElementById('userModal'))
    modal.show()
  } else {
    showDropdown.value = !showDropdown.value
  }
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userName')
  localStorage.removeItem('email')
  router.push('/')
  location.reload()
}
</script>
