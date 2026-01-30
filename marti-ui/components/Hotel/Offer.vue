<template>
<div v-if="!removedCard">
  <div class="card my-2 testimonial-card"  v-if="!detail && loader == false">
    <div class="card-body d-flex row" >     
      <div class="py-0 py-lg-2 ps-4 col-6 col-lg-2 border-end border-info mb-3 mb-lg-4 mb-lg-0" v-if="offer.flightOffer">
        <div class="font-weight-bold font-size-16 mb-3">
          <i class="la la-plane-departure me-2"></i> {{ $date(offer.flightOffer.travelDate.fromDate).format('DD.MM.YYYY') }}
        </div>
        <div><span class="font-weight-bold">{{offer.flightOffer.flight.departureAirport.name }}</span> ({{offer.flightOffer.flight.departureAirport.code }})</div>
        <div>{{offer.flightOffer.flight.inboundDirectFlight ? 'Direktflug' : ''}}</div>
        <HotelLegList :leg_list="offer.flightOffer.flight?.inboundLegList" />
      </div>
      <div class="py-0 py-lg-2 ps-4 col-6 col-lg-2 border-end border-info mb-3 mb-lg-4 mb-lg-0" v-if="offer.flightOffer">
        <div class="font-weight-bold font-size-16 mb-3">
          <i class="la la-plane-arrival me-2"></i>{{ $date(offer.flightOffer.travelDate.toDate).format('DD.MM.YYYY') }}
        </div>
        <div><span class="font-weight-bold">{{offer.flightOffer.flight.arrivalAirport.name }}</span> ({{offer.flightOffer.flight.arrivalAirport.code }})</div>
        <div>{{offer.flightOffer.flight.outboundDirectFlight ? 'Direktflug' : ''}}</div>
        <HotelLegList :leg_list="offer.flightOffer.flight?.outboundLegList" />
      </div>
       <div class="py-0 py-lg-2 ps-4 col-6 col-lg-4 border-end border-info mb-3 mb-lg-4 mb-lg-0" v-if="!offer.flightOffer">
        <div>From : <span class="font-weight-bold"> {{ $date(offer.travelDate.fromDate).format('DD.MM.YYYY') }}</span> </div>
        <div>To : <span class="font-weight-bold">{{ $date(offer.travelDate.toDate).format('DD.MM.YYYY') }} </span> </div>
      </div>
      <hr class=" mb-3 mt-1 d-block d-lg-none w-100 text-color-12" >
      <div class="d-flex justify-content-between col-12 col-lg-8">
        
        <div class="mx-2 width-100px-in-min-width-996">
          <div class="font-weight-bold">{{ offer.travelDate.duration }} {{ $t('common.days')}}</div>
          <div>{{ offer.hotelOffer.boardType.name}}</div>
          <div>{{ offer.hotelOffer.roomType.name}}</div>
        </div>
        
        <div class="mx-2">
          <div class="d-none d-lg-block">{{$t('offer.operator')}}</div>
          <div class="d-none d-lg-block">{{offer.tourOperator.name}}</div>
          <img
            class="mt-lg-3" style="max-width: 72px;min-width: 50px;"
            :src="offer.tourOperator.png"
          />
        </div>
        <div class="ms-2 d-none d-lg-block">
          <div class="">{{ $t('hotels.offer_info_price')}}</div>
          <div class="font-weight-bold font-size-20 my-2">€ {{ $n(offer.personPrice.value) }}</div>
          <div>
            <button
            class="theme-btn theme-btn-blue rounded "
            @click="checkOffer(offer.code)"
          >{{ $t('hotels.offer_button') }}</button
        >
            
          </div>
        </div>
      </div>
      <hr class="mb-3 mt-1 d-block d-lg-none w-100 text-color-12" />
      <div class="d-flex justify-content-between d-lg-none">
        <div>
          <div class="">{{ $t('hotels.offer_info_price')}}</div>
          <div class="font-weight-bold font-size-20 my-0">€ {{ $n(offer.personPrice.value) }}</div>
        </div>
        <button
          class="theme-btn theme-btn-blue rounded text-center"
          @click="checkOffer(offer.code)"
          >{{ $t('hotels.offer_button') }}</button
        >
      </div>
    </div>
  </div>
  <LoaderOffer v-if="loader"/>
  <HotelOfferDetail :offer="offer" :active_offer="activeOffer" :check_offer_result="check_offer_result" v-if="detail" @close="close" @go="go"/>
</div>
</template>
<script>

export default {
  
  props: ['offer','index','search'],
  data() {
    return {
      loader : false,
      detail : false,
      activeOffer : null,
      is_available  : null,
      removedCard: false,
      check_offer_result: {
        error: false,
        message: "",
      }
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

      this.loader = true;
      
      $fetch(`/api/engine/offer/checkoffer`, {
        method: "POST",
        body: params,
      }).then((res) => {
        if (res.status == false) {
          this.is_available = false;
        }
        this.loader = false;
        this.detail = true;
        this.activeOffer = res.data.response;
        this.check_offer_result.error = res.data.error;
        this.check_offer_result.message = res.data.message;
        //          :href="'/booking/checkout?code='+offer.code"
        if(this.index == 0 && this.check_offer_result.error)
        {
          this.removedCard = true;
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
      this.checkOffer(this.offer.code)
    }
  },

  computed: {
    
  }
}
</script>