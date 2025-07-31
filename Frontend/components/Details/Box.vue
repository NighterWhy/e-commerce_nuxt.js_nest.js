<template>
  <div>
    <div class="row mb-5">
      <div class="col6 col-xl-6 col-lg-6 col-md-12 col-sm-12">
        <img class="img-fluid" :src="item.img" :alt="item.title">
      </div>

      <div class="col6 col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex align-items-center justify-content-start">
        <div class="info pt-xl-0 pt-lg-0 pt-5">
          <span class="float-left pr-3">★★★★★</span>
          <h6 style="width:190px;">3 Görüntüleme</h6>
          <h1 class="font-weight-bold text-uppercase pt-3">{{ item.title }}</h1>
          <h4>{{ item.price }} TL</h4>
          <p class="pt-2 text-muted">Stok: {{ item.stock }}</p>

          <div class="control number text-center mt-3">
            <button class="decrement-button" @click="decrement"
              style="border-right: 0.2px solid lightgrey;float:left;margin-right: 11px;">−</button>
            <span>{{ quantity }}</span>
            <button class="increment-button" @click="increment"
              style="border-left: 0.2px solid lightgrey;margin-left: 16px;">+</button>
          </div>

          <button class="add-to-cart-button mt-3" @click="addToCart(item)">Sepete Ekle</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Product } from '@/components/types'
import { useMainStore } from '@/store'
const store = useMainStore()

defineProps<{ item: Product }>()

const quantity = ref(1)

const increment = () => quantity.value < 9 && quantity.value++
const decrement = () => quantity.value > 1 && quantity.value--

const addToCart = (item: Product) => {
  for (let i = 0; i < quantity.value; i++) {
    store.inCart(item)
  }
}
</script>


<style scoped lang="scss">
.img-fluid {
  min-width: 90% !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.control {
  .number {
    border: 0.2px solid lightgrey;
    font-size: 19px;
    font-weight: bold;
    height: 35px;
    width: 155px;
    margin-bottom: 30px;

    button {
      border: none;
      background: inherit;
      width: 56px;
      height: 35px;
      outline-style: none;

      &:active {
        background-color: lightgrey;
      }

      h5 {
        margin-left: 13px;
        margin-right: 13px;
      }
    }
  }
}

.add-to-cart-button {
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
  width: 155px;
  height: 70px;
  background-color: #2c3539;
  color: #fff;
  font-size: 15px;
  padding: 0px 30px;
  cursor: pointer;
  position: relative;
  top: 0;
  z-index: 10;
  border: none;
  box-shadow: 0 26px 38px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  &:hover,
  &:focus {
    background-color: inherit;
    color: black;
  }
}
</style>
