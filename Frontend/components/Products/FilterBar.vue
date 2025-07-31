<template>
    <div class="col-3 d-none d-lg-block d-xl-block">
        <div class="card-selector">
            <div class="card-body p-5">
                <div class="search-title">
                    <h4>Kategoriler +</h4>
                    <h6 v-for="item in info.types" :key="item.name" @click="selectCategory(item.value)">
                        {{ item.name }}
                    </h6>
                </div>
                
                <div class="search-title">
                    <h5>Fiyat Aralığı</h5>
                    <input type="range" min="0" max="100" value="50" class="slider" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">



import { ref, reactive, watch } from 'vue'

const selectedCategory = ref('')

const info = reactive({
    types: [
        { name: 'Elektronik', value: 'Elektronik' },
        { name: 'Giyim', value: 'Giyim' },
        { name: 'Kitap', value: 'Kitap' },
       
    ],
    
})

const selectCategory = (value:string)=> {
    selectedCategory.value =value
}

watch(selectedCategory, (newCategory) => {
    console.log('Seçilen kategori:', newCategory)
    fetchProductsByCategory(newCategory)
})
const fetchProductsByCategory = async (category: string) => {
    const response = await fetch(`http://localhost:3000/products?category=${category}`)
    const products = await response.json()
    console.log(products)
}

</script>
<style scoped>
.card-selector {
    color: #DCDCDC;
    height: 40rem;
    background: #2c3539 !important;
    box-shadow: 0 8px 6px 0 rgba(0, 0, 0, 0.1), 0 26px 70px 0 rgba(0, 0, 0, 0.69);
}

.search-title {
    margin-bottom: 60px;
}

.search-title h6 {
    cursor: pointer;
}

.circle {
    height: 17px;
    width: 17px;
    border-radius: 50%;
    display: inline-block;
    margin-left: 6px;
    cursor: pointer
}
</style>