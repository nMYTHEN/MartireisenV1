<template>
  <Teleport to="body">
  <div class="offcanvas offcanvas-end" id="destination-modal">
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">{{ $t('search.destination') }}</h5>
      <a
        class="btn"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
        ><i class="la la-close"></i
      ></a>
    </div>
    <div class="offcanvas-body">
        <input type="text" autocomplete="off"  class="form-control font-size-16 pl-0" id="destination_input_mobile" v-model="query" :placeholder="$t('common.beliebig')"  @keyup="setQuery" data-bs-toggle="dropdown" />
        <SearchDestinationDropdown :query="query" class="d-block" :source="source" @select="select"/>
        <div class="offcanvas-footer ">
             <a
            class="btn btn-light"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
        >{{ $t('user.cancel')}}</a>
        <a
            
            class="btn btn-lg theme-btn  theme-btn-orange line-height-28 "
            data-bs-dismiss="offcanvas"
            aria-label="Close"
        >OK</a>
        </div>
    </div>
  </div>
  </Teleport>
</template>

<script>
export default {
  props: ["source"],
  data(){
      return {
          query : ''
      }
  },
  methods: {
    select(type, obj) {
        this.$emit("select", type, obj);       
    },
    setQuery(){
        this.$emit('load',this.query)
    }
  },

  mounted(){
    var myOffcanvas = document.getElementById('destination-modal')
    myOffcanvas.addEventListener('show.bs.offcanvas', function () {
      setTimeout(function(){
        document.getElementById('destination_input_mobile').focus();
      },200)
    })
  }
};
</script>
