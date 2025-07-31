<template>
  <div class="container mt-5">
    <h2 class="mb-4">Profil Bilgilerim</h2>

    <div class="card p-4 shadow-sm">
      <!-- İsim -->
      <div class="form-group mb-3">
        <label>Ad</label>
        <input :readonly="!editMode" v-model="name" type="text" class="form-control" />
      </div>

      <!-- E-Posta -->
      <div class="form-group mb-3">
        <label>Email</label>
        <input :readonly="!editMode" v-model="email" type="email" class="form-control" />
      </div>

      <!-- Şifre (sadece düzenle modunda) -->
      <div class="form-group mb-3" v-if="editMode">
        <label>Yeni Şifre</label>
        <input v-model="password" type="password" class="form-control"
          placeholder="Değiştirmek istemiyorsan boş bırak" />
      </div>

      <!-- Butonlar -->
      <div class="d-flex gap-3">
        <button v-if="editMode" class="btn btn-success" @click="updateUser">Kaydet</button>
        <button v-else class="btn btn-warning" @click="editMode = true">Düzenle</button>

        <button class="btn btn-outline-danger" @click="logout">Çıkış Yap</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'




const name = ref('')
const email = ref('')
const password = ref('')
const editMode = ref(false)

const router = useRouter()
import { useToast } from 'vue-toastification'
const toast = useToast()

onMounted(() => {
  setTimeout(() => {
    const storedName = localStorage.getItem('userName')
    const storedEmail = localStorage.getItem('email')

    if (!storedName || !localStorage.getItem('token')) {
      toast.error('Önce giriş yapmalısın!')
      router.push('/')
    }

    name.value = storedName
    email.value = storedEmail || ''
  }, 300)
})

const updateUser = async () => {
  const userId = localStorage.getItem('token')

  try {
    const res = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value || undefined
      })
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem('userName', name.value)
      if (data.user && data.user.email) {
        localStorage.setItem('email', data.user.email)
      }

      toast.success('Bilgiler başarıyla güncellendi!')
      editMode.value = false
      password.value = ''
    } else {
      toast.error(data.message || 'Güncelleme başarısız!')
    }
  } catch (err) {
    console.error(err)
    toast.error('Sunucu hatası!')
  }
}

const logout = () => {
  localStorage.clear()
  router.push('/')
  location.reload()
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
