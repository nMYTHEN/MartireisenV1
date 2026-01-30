<template>
  <div class="dropdown dropdown-contain gty-container">
    <a class="dropdown-toggle dropdown-btn font-size-16 " href="#" role="button" data-toggle="dropdown"
      data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" id="traveller-dropdown">
      <span class="adult ">{{ filter.adults }} {{ $t('search.adult').substr(0, 3) }}</span>
      -
      <span class="children" data-text="Child" data-text-multi="Children">{{ filter.children.length }} {{
        $t('search.children') }}</span>
    </a>
    <div class="dropdown-menu dropdown-menu-wrap">
      <div class="dropdown-item pt-3">
        <div class="
              qty-box
              d-flex
              align-items-center
              justify-content-between
            ">
          <label>{{ $t('search.adult_dropdown') }}</label>
          <div class="qtyBtn d-flex align-items-center">
            <div class="qtyDec"
              @click="filter.adults > 1 || (filter.children.length > 0 && filter.adults > 0) ? filter.adults-- : null">
              <i class="la la-minus"></i>
            </div>
            <input type="text" name="adult_number" v-model="filter.adults" />
            <div class="qtyInc" @click="filter.adults++">
              <i class="la la-plus"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown-item">
        <div class="
              d-flex
              align-items-center
              justify-content-between
            ">
          <label>{{ $t('search.children') }}</label>
          <div class="qtyBtn d-flex align-items-center">
            <div class="qtyDec" @click="() => {
        filter.children.pop()
        if (filter.adults == 0 && filter.children.length == 0)
          filter.adults++;
      }">
              <i class="la la-minus"></i>
            </div>
            <input type="text" name="child_number" :value="filter.children.length" />
            <div class="qtyInc" @click="filter.children.push({ jahre: 6 })">
              <i class="la la-plus"></i>
            </div>
          </div>

        </div>
        <div class="my-4">
          <div v-for="(children, index) in filter.children" :key="index">
            <div> {{ index + 1 }}.{{ $t('search.children') }} <span class="float-end">{{ children.jahre }} {{
        $t('common.age') }} </span></div>
            <input type="range" min="1" max="12" v-model="children.jahre" class="form-range">
          </div>
        </div>
      </div>
      <div class="modal-footer justify-content-center d-flex d-lg-none">
        <button class="btn theme-btn-orange px-4" @click="closeDropdown()">{{ $t('search.filter_accept') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["adults", "children"],
  data() {
    return {
      filter: {
        adults: 2,
        children: []
      },
    }
  },
  watch: {
    'filter.adults'() {
      this.select()
    },
    'filter.children': {
      handler(newValue, oldValue) {
        this.select()
      },
      deep: true
    }
  },
  methods: {
    closeDropdown() {
      let dropdown = new bootstrap.Dropdown('#traveller-dropdown');
      dropdown.hide();
    },
    select() {
      this.$emit("select", this.filter);
    },
  },

  mounted() {
    this.filter.adults = this.adults;
    this.filter.children = this.children;
  }
};
</script>
