<template>
  <div class="container">
    <div class="form-title-wrap form-box mb-0 p-3">
      <div class="step-bar-wrap text-center">
        <ul
          class="step-bar-list d-flex align-items-center justify-content-around"
        >
          <li class="step-bar flex-grow-1 " v-bind:class="{'step-bar-active' : step >= 1}">
            <span class="icon-element">1</span>
            <p class="pt-2 color-text-2">{{ page }} Seite</p>
          </li>
          <li class="step-bar flex-grow-1 e" v-bind:class="{'step-bar-active' : step >= 2}">
            <span class="icon-element">2</span>
            <p class="pt-2 color-text-2">Formular</p>
          </li>
          <li class="step-bar flex-grow-1" v-bind:class="{'step-bar-active' : step >= 3}">
            <span class="icon-element">3</span>
            <p class="pt-2 color-text-2">Bestätigung</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props : {
      step : {
        type : Number
      },
      page : {
        type : String,
        default : 'Hotel'
      }
    }
} 
</script>