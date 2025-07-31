<template>
  <section class="favorite-products container py-5">
    <h2 class="mb-4">Favori Ürünler</h2>
    <div class="row justify-content-center text-center">
      <div
        v-for="product in favorites"
        :key="product.id"
        class="col-10 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-4 pb-3"
      >
        <div class="card">
          <img
            class="card-img-top"
            :src="useAsset(product.image)"
            :alt="product.name"
            loading="lazy"
          />
          <div class="overlay">
            <button type="button" class="btn btn-light btn-lg">Ekle +</button>
            <button type="button" class="btn btn-light btn-lg">Detay</button>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ formatPrice(product.price) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import useAsset from '~/composables/useAsset'

const favorites = ref([
  { id: 1, name: 'Mack Book Air', image: 'product1.jpg', price: 35000.99 },
  { id: 2, name: 'Eagle Şapka', image: 'product2.jpg', price: 299.99 },
  { id: 3, name: 'Simyacı', image: 'product3.jpeg', price: 399.99 },
  { id: 4, name: 'Masa Lambası', image: 'product4.jpeg', price: 399.99 },
  { id: 5, name: 'Jack Jones Tişört', image: 'product22.webp', price: 399.99 },
   { id: 6, name: 'JBL Kulaklık 2.nesil', image: 'product16.webp', price: 399.99 }
])

function formatPrice(value) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(value)
}
</script>

<style scoped lang="scss">
.favorite-products h2 {
  font-size: 1.75rem;
  font-weight: 600;
}

.card {
  transition: 300ms;
  position: relative;
  overflow: hidden;

  .card-img-top {
    object-fit: contain;
    height: 180px;
    z-index: 1;
  }

  button {
    width: 140px;
    margin-bottom: 10px;
  }

  &:hover img {
    filter: blur(4px);
  }

  &:hover .overlay {
    opacity: 0.4;
  }

  .overlay {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70%;
    background-color: #232b34;
    opacity: 0;
    z-index: 100;
    transition: all 0.3s ease-in;
    top: 0;
  }

  &:hover,
  &:active {
    transform: scaleY(1.02) scaleX(1.02);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25), 0 0px 40px rgba(0, 0, 0, 0.22);
  }
}
</style>
