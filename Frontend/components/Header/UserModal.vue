<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useMainStore } from '../../store'

const email = ref('')
const password = ref('')
const router = useRouter()
import { useToast } from 'vue-toastification'
const toast = useToast()
const store = useMainStore()



onMounted(() => {
  store.initUser()
  store.fetchCartItems()
})

const login = async () => {
  try {
    const res = await fetch(`http://localhost:3000/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem('token', data.user._id)
      localStorage.setItem('userName', data.user.name)
      localStorage.setItem('email', data.user.email)
      store.user = {
        id: data.user._id,
        name: data.user.name,
        email: data.user.email
      }
      toast.success('Giriş başarılı!')
      router.push('/') 
    } else {
      toast.error(data.message || 'Giriş başarısız!')
    }
  } catch (err) {
    toast.error('Sunucu hatası!')
    console.error(err)
  }
}
</script>
<template>
  <div class="modal fade" tabindex="-1" id="userModal" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <button type="button" class="close" data-bs-dismiss="modal" style="outline-style:none;" aria-label="Close">
            <span>x</span>
          </button>
          <form class="px-3 py-2" @submit.prevent="login">
            <div class="form-group">
              <label for="loginEmail">Email</label>
              <input v-model="email" type="email" class="form-control" placeholder="Email giriniz">
            </div>
            <div class="form-group">
              <label for="loginPassword">Şifre</label>
              <input v-model="password" type="password" class="form-control" placeholder="Şifre giriniz">
            </div>
            <div class="form-check">
              <input type="checkbox" class="form-check-input">
              <label class="form-check-label" for="dropdownCheck">
                Beni Hatırla
              </label>
            </div>
            <button type="submit" class="btn-xl btn-success mt-3">Giriş Yap</button>
          </form>
        </div>

        <div class="modal-footer">
          <a class="dropdown-item" href="#">Şifremi Unuttum</a>
          <a class="dropdown-item text-right" href="#" data-bs-dismiss="modal" data-bs-toggle="modal"
            data-bs-target="#registerModal">Kayıt Ol</a>
        </div>
      </div>
    </div>
  </div>
</template>
