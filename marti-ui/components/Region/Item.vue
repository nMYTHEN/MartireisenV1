<template>
  <div class="accordion-item mb-2">
    <h2 class="accordion-header rounded" :id="'panelHeading' + index">
      <button
        class="bg-light accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#panel' + index"
        :aria-controls="'#panel' + index"
      >
        <div class="d-flex w-100 row">
          <div class="col-lg-4 col-8">
            <div class="font-weight-bold text-color-9">
              {{ region.name }} ({{ region.children.length || 0 }})
            </div>
          </div>
          <div class="col-lg-6 d-none d-lg-flex">
            <div class="font-size-12">
              <span
                v-for="(label, i) in region.children"
                :key="i"
                v-show="i < 3"
                >{{ label.name }},</span
              >..
            </div>
          </div>
          <div class="pe-2 col-lg-2 col-4">
            <div class="float-end">
              <small class="me-2">ab</small>
              <span class="font-weight-bold">€ {{ $n(region.price) }}</span>
            </div>
          </div>
        </div>
      </button>
    </h2>
    <div
      :id="'panel' + index"
      class="accordion-collapse collapse"
      :aria-labelledby="'panelHeading' + index"
      :class="{'show' : index == 0}"
    >
      <div class="accordion-body py-1">
        <div
          class="d-flex  my-2 py-1 row  border-bottom"
          v-for="(subregion, subindex) in region.children"
          v-bind:key="subindex"
        >
          <div class="col-lg-5 col-12">
            <div class="font-weight-bold">{{ subregion.name }}</div>
          </div>
          <div class="col-lg-5 col-8">
            <span class="mx-2"
              ><i class="la la-sun text-color-4 me-1"></i
              >{{ subregion.temp.air }}°</span
            >
            <span class="mx-2"
              ><i class="la la-water text-color me-1"></i
              >{{ subregion.temp.water || '--' }}°</span
            >
            <span class="mx-2"
              ><i class="la la-plane text-success"></i
              >{{ toHoursAndMinutes(subregion.flight.estimatedTime) }}</span
            >
          </div>
          <div class="col-lg-2 col-4 ">
            <button
              @click="go(subregion)"
              class="pe-2 theme-btn theme-btn-orange theme-btn-small float-end"
              ><small class="me-2">ab</small>
              <span class="font-weight-bold">€ {{ $n(subregion.price) }}</span></button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["region", "index"],
  methods : {
    go(destination){
      this.$emit('search',destination)
    },
    toHoursAndMinutes(totalMinutes) {
      if(totalMinutes == null || totalMinutes == 0){return "3h 30 m";}
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return `${hours}h ${this.padToTwoDigits(minutes)} m`;
    },
    padToTwoDigits(num) {
      return num.toString().padStart(2, '0');
    }
  }
};
</script>