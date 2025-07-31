<template>
  <div class="container mt-5">
    <h2 class="mb-4">Yeni Ürün Ekle</h2>

    <div class="card p-4 shadow-sm">
      <div class="form-group mb-3">
        <label>Ürün Adı</label>
        <input v-model="name" type="text" class="form-control" />
      </div>

      <div class="form-group mb-3">
        <label>Fiyat</label>
        <input v-model="price" type="number" class="form-control" />
      </div>

      <div class="form-group mb-3">
        <label>Stok</label>
        <input v-model="stock" type="number" class="form-control" />
      </div>

      <div class="form-group mb-3">
        <label>Kategori</label>
        <select v-model="category" class="form-control">
          <option disabled value="">Kategori Seç</option>
          <option value="Elektronik">Elektronik</option>
          <option value="Giyim">Giyim</option>
          <option value="Kitap">Kitap</option>
        </select>
      </div>

      <div class="form-group mb-3">
        <label>Ürün Açıklaması</label>
        <input v-model="description" type="text" class="form-control" />
      </div>

      <div class="form-group mb-3">
        <label>Ürün Fotoğrafı</label>
        <input type="file" ref="fileInput" class="form-control" />
      </div>

      <button class="btn btn-success" @click="uploadProduct">Ürün Ekle</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'




const name = ref('')
const price = ref('')
const stock = ref('')
const category = ref('')
const description = ref('')
const fileInput = ref(null)
import { useToast } from 'vue-toastification'
const toast = useToast()

const uploadProduct = async () => {
  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('price', price.value)
  formData.append('stock', stock.value)
  formData.append('category', category.value)
  formData.append('description',description.value)
  formData.append('seller', localStorage.getItem('userName'))
  formData.append('photo', fileInput.value.files[0])

  try {
    const res = await fetch(`http://localhost:3000/products/upload`, {
      method: 'POST',
      body: formData
    })

    if (res.ok) {
      toast.success('Ürün başarıyla eklendi!')
      name.value = ''
      price.value = ''
      stock.value = ''
      category.value = ''
      description.value=''
      fileInput.value.value = null
    } else {
      const data = await res.json()
      toast.error(data.message || 'Ekleme başarısız!')
    }
  } catch (err) {
    toast.error('Sunucu hatası!')
    console.error(err)
  }
}
</script>
