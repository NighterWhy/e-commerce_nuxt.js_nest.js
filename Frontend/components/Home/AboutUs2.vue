<template>
  <section class="about-us bg-light py-5">
    <div class="container">
      
      <div class="row align-items-center mb-5">
        <div class="col-12 col-md-6">
          <img
            class="img-fluid rounded shadow-sm"
            src="~/assets/product5.jpg"
            alt="Öne çıkan ürün"
          />
        </div>
        <div class="col-12 col-md-6">
          <h2>Öne Çıkan Ürünler</h2>
          <p>
            Pixa'nın seçtiği en popüler ürünlerle Alışverişin Tadını Çıkarın.  
            Moda, elektronik ve aksesuar kategorilerinde haftanın öne çıkan fırsatları burada!
          </p>
        </div>
      </div>

      
      <div class="row align-items-center flex-md-row-reverse">
        <div class="col-12 col-md-6">
          <img
            class="img-fluid rounded shadow-sm"
            src="~/assets/2.jpg"
            alt="Kampanyalı ürün"
          />
        </div>
        <div class="col-12 col-md-6 text-md-right">
          <h2>Kaçırılmayacak Fırsatlar</h2>
          <p>
            Seçili ürünlerde %50’ye varan indirim fırsatlarını yakalayın!  
            Ücretsiz kargo ve kapıda ödeme avantajlarıyla alışveriş keyfini katlayın.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-us {
  background-color: #f2f8fc; /* Hafif mavi ton */
}
.about-us h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
}
.about-us p {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
}
.img-fluid {
  max-width: 250px;
  height: auto;
}
.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
</style>
