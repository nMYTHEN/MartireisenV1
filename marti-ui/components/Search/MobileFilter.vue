<template>
<div>
  <a  data-bs-toggle="modal" data-bs-target="#filter-modal" class="text-start btn border font-size-14 font-weight-bold line-height-20  d-lg-none justify-content-between w-100 d-flex " >
    <span v-if="data">{{ data.destination.name }}<br><small>
      {{ $date(data.date.start).format('DD.MM.YYYY') }} / {{ $date(data.date.end).format('DD.MM.YYYY') }}
      </small></span>
    <i class="la la-sliders-h font-size-24 py-2"></i>
  </a>
  <div class="modal" tabindex="-1" id="filter-modal" data-bs-backdrop="static">
    <div class="modal-dialog  modal-fullscreen ">
      <div class="modal-content">
        <div class="modal-header offcanvas-header">
          <h5 class="modal-title">Reiseziel auswahlen</h5>
          <button type="button" class="btn-close btn-close-white " data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <SearchEngine :no_header="true"></SearchEngine>
          <HotelFilterMobile v-bind:filter_data="filter_data" v-bind:count="0" class="d- d-lg-none" />
        </div>
      
      </div>
    </div>
  </div>
</div>
</template>

<script>
import search from '/utils/search';

export default {
  props: ["source","filter_data"],
  components : {
    search
  },
  data(){
      return {
          query : '',
          data : null
      }
  },
  mounted(){
    this.data = search.get();
  },
  methods: {
    select(type, obj) {
        this.$emit("select", type, obj);       
    },
    setQuery(){
        this.$emit('load',this.query)
    }
  },
  setup(){
    try{
      let modal_body= document.querySelectorAll('#filter-modal .modal-body')[0];
      let apply_button = document.querySelectorAll('.apply-filter-button')[0];
      let top_of_filters= document.getElementById('top-of-filters');
      apply_button.classList.add('d-none');
      apply_button.classList.remove('d-block');
      modal_body.onscroll = (x)=>{
        if(modal_body.scrollTop >= (top_of_filters.offsetTop - 10))
        {
          apply_button.classList.add('d-block');
          apply_button.classList.remove('d-none');
        }
        else
        {
          apply_button.classList.add('d-none');
          apply_button.classList.remove('d-block');
        }
      }
    }
    catch(e){
       
    }

  }
};
</script>
