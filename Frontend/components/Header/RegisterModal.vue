<script setup>


import { ref } from 'vue'

import { useToast } from 'vue-toastification'
const toast = useToast()

const name = ref('')
const email = ref('')
const password = ref('')
const password2 = ref('')

const register = async (e) => {
  e.preventDefault()

  if (password.value !== password2.value) {
    toast.error('Şifreler uyuşmuyor')
    return
  }

  const res = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value
    })
  })

  const data = await res.json()

  if (res.ok) {
    toast.success('Kayıt başarılı, şimdi giriş yapabilirsin')
    const loginModal = new bootstrap.Modal(document.getElementById('userModal'))
    loginModal.show()
  } else {
    toast.error(data.message || 'Kayıt başarısız')
  }
}

</script>



<template>
  <div class="modal fade" tabindex="-1" id="registerModal" role="dialog" aria-labelledby="registerModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <!-- Close butonu -->
        <button type="button" class="close p-2" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>

        <div class="modal-body">
          <form class="px-3 py-2" @submit="register">
            <div class="form-group mb-3">
              <label for="registerName">İsim</label>
              <input id="registerName" v-model="name" type="text" class="form-control" placeholder="İsim giriniz"
                required />
            </div>

            <div class="form-group mb-3">
              <label for="registerEmail">Email</label>
              <input id="registerEmail" v-model="email" type="email" class="form-control" placeholder="Email giriniz"
                required />
            </div>

            <div class="form-group mb-3">
              <label for="registerPass">Şifre</label>
              <input id="registerPass" v-model="password" type="password" class="form-control"
                placeholder="Şifre giriniz" required />
            </div>

            <div class="form-group mb-3">
              <label for="registerPass2">Şifre Tekrar</label>
              <input id="registerPass2" v-model="password2" type="password" class="form-control"
                placeholder="Şifreyi tekrar giriniz" required />
            </div>

            <div class="form-check mb-3">
              <input id="termsCheck" type="checkbox" class="form-check-input" required />
              <label class="form-check-label" for="termsCheck">
                Kullanım Şartlarını kabul ediyorum
              </label>
            </div>

            <button type="submit" class="btn btn-primary btn-xl w-100 mt-2">
              Kayıt Ol
            </button>
          </form>

        </div>

        <div class="modal-footer justify-content-center">
          <span>
            Hesabınız var mı?
            <button type="button" class="btn btn-link p-0" data-bs-dismiss="modal" data-bs-toggle="modal"
              data-bs-target="#userModal">
              Giriş Yap
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.close {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
}
</style>
