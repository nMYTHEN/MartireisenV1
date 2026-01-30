<template>
<div>
  <div class="card my-2 testimonial-card"  >
    <div class="card-body d-flex row" >
   
       <div class="py-0 py-lg-2 ps-4 col-6 col-lg-4  " >
          <div>
            <img class="img-thumbnail" :src="offer.room.photos[0]"/>
          </div>
      </div>
      <hr class=" mb-3 mt-1 d-block d-lg-none w-100 text-color-12" >
      <div class="d-flex justify-content-between col-12 col-lg-8 py-3">
        
        <div class="mx-2">
          <div class="font-weight-bold font-size-20 mb-3"> {{ offer.room.name }}</div>
          <div class="font-size-16"><i class="la la-concierge-bell me-2"></i>{{ offer.rate_plan.board_basis_name }}</div>
          <div class="font-size-16"><i class="la la-utensils me-2"></i>{{ offer.rate_plan.meal_plan_name }}</div>
        </div>
        
       
        <div class="ms-2 d-none d-lg-block">
          <div class="">{{ $t('hotels.offer_info_price')}}</div>
          <div class="font-weight-bold font-size-20 my-2">€ {{ offer.price }}</div>
          <div>
            <button
            class="theme-btn theme-btn-blue rounded "
            @click="checkOffer(offer.confirmation)"
          >{{ $t('hotels.offer_button') }}</button
        >
            
          </div>
        </div>
      </div>
      <hr class="mb-3 mt-1 d-block d-lg-none w-100 text-color-12" />
      <div class="d-flex justify-content-between d-lg-none">
        <div>
          <div class="">{{ $t('hotels.offer_info_price')}}</div>
          <div class="font-weight-bold font-size-20 my-0">€ {{ offer.price }}</div>
        </div>
        <button
          class="theme-btn theme-btn-blue rounded text-center"
          @click="checkOffer(offer.confirmation)"
          >{{ $t('hotels.offer_button') }}</button
        >
      </div>
    </div>
  </div>
</div>
</template>
<script>

export default {
  
  props: ['offer','index','search'],
  data() {
    return {
      detail : false,
      activeOffer : null,
    }
  },
  methods : {

    checkOffer(code){
      
      let params = {
        code: code,
        adults: this.search.adults,
        children: this.search.children,
      };

      if (code == "") {
        return false;
      }
      
      $fetch(`/api/engine/offer/checkoffer`, {
        method: "POST",
        body: params,
      }).then((res) => {
        if (res.status == false) {
          this.is_available = false;
        }
       
      });
    },

    go(code){
        window.localStorage.setItem('m_'+code, JSON.stringify(this.search));
        window.location.href = '/booking/checkout?code='+code; //, query: { code: code }});
    },

    close(){
      this.detail = false;
    }
  },

  mounted(){
    if(this.index == 0){
     // this.checkOffer(this.offer.code)
    }
  },

  computed: {
    
  }
}
</script>