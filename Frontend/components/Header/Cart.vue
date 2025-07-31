<template>
  <div>
    <!-- slide‐in cart -->
    <div v-show="isOpen" :class="['cart', isOpen ? 'on' : '']">
      <div class="cart-menu">
        <p class="text-center mt-4 pb-2 h3">Sepetim</p>
        <hr />

        <!-- boş sepet bildirimi -->
        <Notification v-if="!store.itemsNumber">
          Sepetiniz boş, lütfen ürün ekleyiniz.
        </Notification>

        <!-- ürünleri listele -->
        <div class="row" v-for="item in store.cartItems" :key="item.productId">
          <span>{{ item.title }}</span>
          <span>{{ item.price }} TL</span>
          <span>{{ item.quantity }}</span>
        </div>

        <!-- toplam -->
        <div v-if="store.itemsNumber">
          <hr />
          <CartTotal/>
          <button @click="onCheckout" class="btn btn-success w-100 mt-3">
            Sipariş Ver </button>
        </div>
      </div>
    </div>

    <!-- modal overlay -->
    <div v-show="isOpen" class="modal" @click="closeCart"></div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store'
import Notification from '@/components/Notification.vue'
import CartTotal from '@/components/Cart/Total.vue'


const { isOpen } = defineProps<{ isOpen: boolean }>()

const emit = defineEmits<{
  (e: 'closeCart'): void
}>()

const store = useMainStore()

function closeCart() {
  emit('closeCart')
}

async function onCheckout() {
  await store.checkout()
  emit('closeCart')
}
</script>

<style scoped>
/* Modal Overlay */
.modal {
  display: block;
  z-index: 1050;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
}

.modal.off {
  display: none;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Cart Body */
.cart {
  position: fixed;
  margin-right: 0px;
  top: 0;
  right: 0;
  width: 360px;
  height: 100%;
  background: #303e49;
  overflow-y: auto;
  z-index: 1051;
  -webkit-overflow-scrolling: touch;
  transform: translateX(360px);
  transition-property: transform;
  transition-duration: 0.4s;
}

.cart.on {
  transform: translateX(0);
  -webkit-overflow-scrolling: touch;
  transition-property: transform;
  transition-duration: 0.4s;
}

.cart-menu {
  color: #eee;
  margin-left: 10px;
  margin-right: 15px;
}

hr {
  border-color: white;
}

.row {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
