<template>
  <section class="newsletter-area">
    <div class="container">
      <div class="row justify-content-between">

        <!-- Newsletter Text -->
        <div class="col-12 col-lg-6">
          <div class="newsletter-text">
            <h2>Pixa E-Ticaret</h2>
            
          </div>
        </div>

        <!-- Newsletter Form -->
        

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

function submit(): void {
  return alert('Thank you for subscribing')
}

</script>

<style scoped lang="scss">
.newsletter-area {
  position: relative;
  z-index: 1;
  background-color: #dbf0fa;
  padding: 75px;

  .newsletter-text {
    position: relative;
    z-index: 1;

    h2 {
      font-size: 36px;
      margin-bottom: 10px;
      color: #2c3539;
    }

    p {
      color: #2c3539;
      margin-bottom: 0;
    }
  }

  .newsletter-form {
    form {
      position: relative;
      z-index: 1;

      .nl-email {
        width: 100%;
        height: 50px;
        background-color: inherit !important;
        color: #2c3539;
        font-size: 20px;
        font-style: italic;
        border: none;
        outline: none;
        border-bottom: 2px solid #2c3539;
        padding: 0 30px;
      }
    }

    .input-button {
      -webkit-transition-duration: 500ms;
      transition-duration: 500ms;
      height: 50px;
      background-color: #2c3539;
      color: #fff;
      font-size: 18px;
      padding: 0px 30px;
      cursor: pointer;
      position: relative;
      top: 0;
      z-index: 10;
      border: none;
      box-shadow: 0 8px 6px 0 rgba(0, 0, 0, 0.1), 0 16px 70px 0 rgba(0, 0, 0, 0.69);

      &:hover,
      &:focus {
        background-color: inherit;
        color: black;
      }
    }
  }
}
</style>
