<template>
  <div class="offcanvas offcanvas-end" id="traveller-modal">
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">{{ $t('search.traveller')}}</h5>
      <a
        class="btn"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
        ><i class="la la-close"></i
      ></a>
    </div>
    <div class="offcanvas-body">
        <div class="">
        <div class=" pt-3">
          <div
            class="
              qty-box
              d-flex
              align-items-center
              justify-content-between
              mb-4
            "
          >
            <label>{{ $t('search.adult_dropdown')}}</label>
            <div class="qtyBtn d-flex align-items-center">
              <div class="qtyDec" @click="filter.adults--">
                <i class="la la-minus"></i>
              </div>
              <input type="text" name="adult_number" v-model="filter.adults"  />
              <div class="qtyInc" @click="filter.adults++">
                <i class="la la-plus"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <div
            class="
              d-flex
              align-items-center
              justify-content-between
            "
          >
            <label>{{ $t('search.children')}}</label>
            <div class="qtyBtn d-flex align-items-center">
              <div class="qtyDec" @click="filter.children.pop()">
                <i class="la la-minus"></i>
              </div>
              <input type="text" name="child_number" :value="filter.children.length" />
              <div class="qtyInc" @click="filter.children.push({jahre : 6})">
                <i class="la la-plus"></i>
              </div>
            </div>
            
          </div>
          <div class="my-4" >     
              <div v-for="(children,index) in filter.children" :key="index" >
                <div> {{ index+1}}.{{ $t('search.children')}} <span class="float-end">{{ children.jahre }} {{ $t('common.age')}} </span></div>
                <input type="range" min="1" max="12" v-model="children.jahre" class="form-range" >
              </div>
          </div>
        </div>
      
    </div>
    <div class="offcanvas-footer ">
             <a
            class="btn btn-light"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
        >{{ $t('user.cancel')}}</a>
        <a
            class="btn theme-btn theme-btn-orange line-height-28 "
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            @click="select()"
        >{{ $t('search.filter_accept')}}</a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["adults","children"],
  data() {
    return {
      filter: {
        adults : 2,
        children : []
      },
    }
  },
  watch : {
    'filter.adults'(){
      this.select()
    },
    'filter.children' : {
      handler(newValue, oldValue) {
        this.select()
      },
      deep: true
    }
  },
  methods: {
    closeDropdown(){
      let dropdown = new bootstrap.Dropdown('#traveller-dropdown');
      dropdown.hide();
    },
    select() {
      this.$emit("select", this.filter);
    },
  },

  mounted(){
    this.filter.adults = this.adults;
    this.filter.children = this.children;
  }
};
</script>