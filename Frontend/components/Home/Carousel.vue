<template>
  <section class="carousel">
    <div id="heroControls" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#heroControls" data-bs-slide-to="0" class="active" aria-current="true"
          aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#heroControls" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#heroControls" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="img-fluid" src="~/assets/product1.jpg" alt="First-slide" title="First-slide">
        </div>
        <div class="carousel-item">
          <img class="img-fluid" src="~/assets/product2.jpg" alt="Second-slide" title="Second-slide">
        </div>
        <div class="carousel-item">
          <img class="img-fluid" src="~/assets/product3.jpeg" alt="Third-slide" title="Third-slide">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.carousel-inner {
  position: relative;    /* Slaytları mutlak konumlayabilmek için */
  overflow: hidden;      /* Taşan kısımları gizle */
  height: 80vh;          /* İstersen burayı da buraya alabilirsin */
}

/* Tüm slaytları başta gizle ve üst üste yerleştir */
.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
}

/* Sadece aktif slaytı göster ve flex ile ortaya al */
.carousel-item.active {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Resmi orantılı göster, yanlarda boşluk olabilir */
.carousel-item img {
  max-height: 100%;
  width: auto;
  object-fit: contain;
  object-position: center;
}

/* İndikatör stilleri */
.carousel-indicators button {
  background-color: white;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  border: 1px solid #817F7F;
}
.carousel-indicators .active {
  background: #e0f0f8;
}
</style>
