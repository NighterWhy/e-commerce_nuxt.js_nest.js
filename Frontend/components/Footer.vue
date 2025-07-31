<template>
  <footer class="footer_area">
    <div class="container">
      <div class="row justify-content-between">
        <!-- Navigate -->
        <div class="col-3 col-xl-2 col-lg-3 col-md-3 col-sm-3">
          <div class="footer-widget">
            <div class="footer-title">Yönlendirme</div>
            <ul class="list-unstyled">
              <NuxtLink to="/">
                <li>Ana Sayfa</li>
              </NuxtLink>
              <NuxtLink to="/">
                <li>Hakkımızda</li>
              </NuxtLink>
              <NuxtLink to="/">
                <li>iletişim</li>
              </NuxtLink>
              
            </ul>
          </div>
        </div>

        
        <div class="col-3 col-xl-2 col-lg-3 col-md-3 col-sm-3">
          <div class="footer-widget">
            <div class="footer-title">Kategoriler</div>
            <ul class="list-unstyled">
              <NuxtLink to="/products?category=teknoloji">
                <li>Teknoloji</li>
              </NuxtLink>
              <NuxtLink to="/products?category=kitap">
                <li>Kitap</li>
              </NuxtLink>
              <NuxtLink to="/products?category=giyim">
                <li>Giyim</li>
              </NuxtLink>
            </ul>
          </div>
        </div>

        <!-- Kategoriler -->
        

        <!-- İletişim / Adres -->
        <div class="col-12 col-xl-6 col-lg-3 col-md-3 col-sm-12 text-left text-md-right pb-5">
          <div class="footer-widget">
            <h3>Yıldız Teknik Üniversitesi</h3>
            <h4>Davutpaşa Teknopark Esenler D2 Blok, No: 201</h4>
            <h4>İstanbul</h4>
            <a href="mailto:asff@fdsfsdc.com">serhat.simsek@pixasoftware.com</a>
            <h5>+905415415555</h5>
          </div>
        </div>
      </div>

      
      <div class="row justify-content-between">
        <div class="col-xl-7 col-lg-6 col-md-6 col-sm-6 col-6">
          <div class="tiny-footer">
           
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer_area {
  position: relative;
  z-index: 1;
  color: #2c3539;
  background-color: #fefefe;
}

.footer-widget {
  padding-top: 60px;
}

.footer-title {
  padding-bottom: 20px;
  font-weight: bold;
}

.list-unstyled {
  a {
    text-decoration: none;

    li {
      color: #2c3e50;
      margin-bottom: 10px;
    }
  }
}

.social-info > img {
  padding-left: 10px;
}

.social-info > img:hover {
  opacity: 0.7;
}
</style>
