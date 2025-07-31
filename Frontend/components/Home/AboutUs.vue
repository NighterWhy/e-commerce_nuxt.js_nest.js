<template>
  <section class="about-us">
    <!-- 1. Satır -->
    <div class="row align-items-center p-4">
      <div class="col-12 col-md-6">
        
      </div>
      <div class="col-12 col-md-6">
        <h2>New minimalist<br>–components</h2>
        <p>Gravity will force your feet to the ground. …</p>
      </div>
    </div>

    <!-- 2. Satır (mobilde normal, md+ ekranda ters sıra için flex-md-row-reverse) -->
    <div class="row align-items-center p-4 flex-md-row-reverse">
      <div class="col-12 col-md-6">
        
      </div>
      <div class="col-12 col-md-6 text-md-right">
        <h2>Save Space<br>more freedom</h2>
        <p>Gravity will force your feet to the ground. …</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-us img {
  /* img-fluid zaten width:100% ve height:auto ayarlı,
     ekstra taşma olmaması için: */
  max-width: 100%;
  height: auto;
}
</style>
