<template>
   <Teleport to="body">
    <div class="offcanvas offcanvas-end" id="datepicker-modal">
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Reisedatum</h5>
        <a
          type="button"
          class="btn"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          ><i class="la la-close"></i
        ></a>
      </div>
      <div class="offcanvas-body mobile-datepicker">
          <DatePicker v-model="range" is-range  :rows="2" :step="1"  color="orange"  class="px-5 border-0"></DatePicker>
        
          <div class="offcanvas-footer sticky-bottom pb-4">
              <a
              class="btn btn-light"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
          >{{ $t('user.cancel')}}</a>
          <a @click="setDate"
              class="btn theme-btn theme-btn-orange line-height-28 "
          >{{ $t('search.take')}}</a>
          </div>

        
      </div>
      <div class="modal fade" id="mobile-duration-error-modal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-body text-center">
                  {{ $t('search.duration_range_error')}}
                </div>
                <div class="modal-footer border-0 justify-content-center pb-4">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('search.date_reset')}}</button>
                  <button type="button" class="btn theme-btn-orange" @click="setDuration">{{ $t('search.duration_set').replace('{number}',diff)}}</button>
                </div>
              </div>
            </div>
        </div>
    </div>
</Teleport>
</template>


<script>

import { DatePicker }  from 'v-calendar';
import 'v-calendar/dist/style.css';
import search from '/utils/search';

export default {
  props: ['date'],
  components : {
      DatePicker,
  },
  data(){
      return {
          modal : null,
          data : null,
          diff : null,
          query : '',
          range : { start : '' , end : ''},
          new_duration: 0
      }
  },
  methods: {

    setDate(){

      let { duration } = search.get();
      if(this.new_duration > 0)
          duration = this.new_duration;

      let start = new Date(this.range.start).getTime();
      let end  = new Date(this.range.end).getTime();


      let diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
      diff = diff +1;
      if(Number.isInteger(diff) && diff < parseInt(duration)) {
        this.diff = diff;
        this.modal.show();
        return false;
      }

      let myOffCanvas = document.getElementById('datepicker-modal');
      let myCanvas =  bootstrap.Offcanvas.getInstance(myOffCanvas)
      myCanvas.hide();

      this.$emit('setDate',this.range);
    },
    
    setDuration(){
      this.$emit('setDuration',this.diff)
      this.new_duration = this.diff;
      this.modal.hide();
      this.setDate();
    },  
  },
  mounted(){

    this.range = this.date;
    try {
      this.modal = new bootstrap.Modal('#mobile-duration-error-modal', {
        keyboard: false,
        backdrop:false
      })
    } catch (error) {
       
    }
    
  },
 
};
</script>
