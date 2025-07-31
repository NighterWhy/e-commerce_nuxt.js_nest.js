<template>
    <div class="row align-items-center p-2" style="background:#7dcf85">
        <div class="col pl-3 pt-3">
            <h4>Toplam</h4>
            <p class="fs-6 px-3" style="color:#303E49;margin-top: -8px">
                {{ `(${store.itemsNumber} Ürün)` }}
            </p>
        </div>
        <div class="col text-center pr-3">
            <h4>{{ store.totalPrice }}TL</h4>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store'
const store = useMainStore()
</script>