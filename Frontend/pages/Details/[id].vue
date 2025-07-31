<template >
  <div class="container py-5" style="padding-top:70px;">
    <!-- TODO dont allow accessing of the route to this page '/info' except if there is info to display -->
    <DetailsBreadcrumb :details="(item.details)" />
    <DetailsBox :item="item.details" />
    <DetailsText :item="item.details"/>

    <div class="related-item">
      <hr>
      <h6 class="pb-4">DİĞER ÜRÜNLERE GÖZAT</h6>
      <ClientOnly>
        <ProductsCard :cards="sliceItems" />
      </ClientOnly>
    </div>

  </div>
</template>

<script setup lang="ts">
import { Product } from '~/components/types'
const store = useMainStore()
const route = useRoute()

interface Item {
  details: Product
  relatedItems: Product[]
}

const item: Item = reactive({
  details: {},
  relatedItems: []
})

onMounted(async() => {
  const id = route.params.id as string
  await store.fetchSingleProduct(id)
  item.details = store.productInfo
})

const sliceItems = computed(() => {
  if (store.items.length === 0) return []

  const selected: Product[] = []
  const used = new Set()

  while (selected.length < 3 && used.size < store.items.length) {
    const i = Math.floor(Math.random() * store.items.length)
    if (!used.has(i)) {
      used.add(i)
      selected.push(store.items[i])
    }
  }

  return selected
})

</script>

<style scoped>
hr {
  width: 50px;
  border-bottom: 1px solid black;
}

.related-item {
  padding-left: 8rem;
  padding-right: 8rem;
  height: auto;
  text-align: center;
}
</style>
