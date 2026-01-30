<template>
  <div class="card my-2 testimonial-card" :class="borderClass">
    <div class="card-header text-white rounded-0 d-flex justify-content-between" :class="headerClass">
      <div v-if="!check_offer_result.error" class="py-1"><i class="la la-check me-2"></i>{{ $t('offer.is_available')}}</div>
      <div v-else class="py-1"><i class="la la-remove me-2"></i>{{ $t('offer.is_not_available')}}</div>
      <a class="btn btn-link btn-sm text-white " @click="close()"><i class="la la-close"></i></a>
      </div>
    <div class="card-body d-flex row" >
      <div class="py-0 py-lg-2 ps-lg-4 ps-3 col-12 col-lg-4 border-end border-info mb-3  mb-lg-0" v-if="offer.flightOffer">
         <h3 class="title font-size-16 text-color-6 font-weight-bold mb-3">
          {{ $t("offer.flight_info") }}
        </h3>
        <div class="font-weight-bold font-size-16 ">
          {{ $t('offer.flight_point')}} : 
        </div>
        <div v-for="(flight,index) in active_offer.commonOffer.flightOffer.flight.outbound.legList" :key="index" class="  ">
            
            <div class="d-flex justify-content-between">
                <div>{{flight.flightCarrierName}} <small>{{flight.flightNumber}}</small></div>
                <div></div>
            </div>
            <div class="d-flex justify-content-center bg-rgb-6">
              <div class="col-1 mx-2 pt-2">
                <i class="la la-plane-departure font-size-24"></i>
              </div>
              <div class="col-9 pt-2">
                <b >{{ $date(flight.arrivalDate).format('DD.MM.YYYY') }}</b>
              </div>
            </div>
            <div class="d-flex justify-content-between bg-rgb-6 px-4 py-2  font-size-12 line-height-20" >
              <div class="col-6">
                <div class="font-weight-bold">{{flight.departureAirportCode}}</div>
                <div>{{flight.departureAirportName}}</div>
                <div class="text-color-12 font-weight-bold">{{flight.departureTime}}</div>
              </div>
              <div class="col-6">
                <div class="font-weight-bold">{{flight.arrivalAirportCode}}</div>
                <div>{{flight.arrivalAirportName}}</div>
                <div class="text-color-12 font-weight-bold">{{flight.arrivalTime}}</div>
              </div>
            </div>
        </div>
         <div class="font-weight-bold font-size-16 mt-3">
          {{ $t('offer.flight_return')}}:
        </div>
       <div v-for="(flight,index) in active_offer.commonOffer.flightOffer.flight.inbound.legList" :key="index" class="  ">
            <div class="d-flex justify-content-between">
                <div>{{flight.flightCarrierName}} <small>{{flight.flightNumber}}</small></div>
                <div></div>
            </div>
            <div class="d-flex justify-content-center bg-rgb-6">
              <div class="col-1 mx-2 pt-2">
                <i class="la la-plane-departure font-size-24"></i>
              </div>
              <div class="col-9 pt-2">
                <b >{{ $date(flight.arrivalDate).format('DD.MM.YYYY') }}</b>
              </div>
            </div>
            <div class="d-flex justify-content-between bg-rgb-6 px-4 py-2 font-size-12 line-height-20 " >
              <div class="col-6">
                <div class="font-weight-bold">{{flight.departureAirportCode}}</div>
                <div>{{flight.departureAirportName}}</div>
                <div class="text-color-12 font-weight-bold">{{flight.departureTime}}</div>
              </div>
              <div class="col-6">
                <div class="font-weight-bold">{{flight.arrivalAirportCode}}</div>
                <div>{{flight.arrivalAirportName}}</div>
                <div class="text-color-12 font-weight-bold">{{flight.arrivalTime}}</div>
              </div>
            </div>
        </div>
        <div class="my-2">
        <small >{{ $t('offer.flight_time')}}</small>
        </div>
      </div>
     
       <div class="py-0 py-lg-2 ps-4 col-6 col-lg-4 border-end border-info mb-3 mb-lg-4 mb-lg-0" v-if="!offer.flightOffer">
    
        <div>From : <span class="font-weight-bold"> {{ format(offer.travelDate.fromDate) }}</span> </div>
        <div>To : <span class="font-weight-bold">{{ format(offer.travelDate.toDate) }}</span> </div>
      </div>
      <hr class=" mb-3 mt-1 d-block d-lg-none w-100 text-color-12" >
      
      <div class="col-12 col-lg-4 border-end border-info row mx-0 px-0">
        <div class="col-6 col-lg-12 mb-3">
          <h3 class="title font-size-16 text-color-6 font-weight-bold mb-1">
            {{ $t("offer.services") }}
          </h3>
          <div class="mx-2">
            <div class="font-weight-bold"><i class="la la-check me-1"></i> {{ offer.travelDate.duration }} {{ $t('common.days')}}</div>
            <div> <i class="la la-check me-1"></i> {{ offer.hotelOffer.boardType.name}}</div>
            <div>  <i class="la la-check me-1"></i> {{ offer.hotelOffer.roomType.name}}</div>
          </div>
        </div>
        <div class="col-6 col-lg-12" >
        <HotelFacility 
              :keyword_list="offer.hotelOffer.hotel.keywordList" 
              :show_modal_button="true" 
              :hotel_code="offer.hotelOffer.hotel.code"
              label_class="title font-size-16 text-color-6 font-weight-bold mb-1"/>
        </div>
        <div class="col-6 col-lg-12">
          <h3 class="title font-size-16 text-color-6 font-weight-bold mb-2 mt-0 mt-lg-4">
            {{ $t("offer.operator") }}
          </h3>
        
          <div class="mx-2">
            <!-- <div class="d-none d-lg-block">{{$t('offer.operator')}}</div> -->
            <div class="d-none d-lg-block">{{offer.tourOperator.name}}</div>
            <img
              class="mt-lg-3" style="max-width: 100px;min-width: 50px;"
              :src="offer.tourOperator.png"
            />
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
         <h3 class="title font-size-16 text-color-6 font-weight-bold mb-1  mt-lg-0 d-none d-lg-block">
          {{ $t("offer.price_summary") }}
        </h3>

          <div>
            <div v-for="(person,index) in active_offer.travellerList" :key="index">
              <span class="font-weight-bold"> {{ index+1}}. </span> 
              <span>{{ person.type == 'H' ?  $t('search.adult') : ($t('search.children') + '('+person.age+' jahre )')}}</span>
            </div>
            <hr>
          </div>
         <div class=" ">
           <div class="d-flex justify-content-between w-100 font-size-18  mt-3 mb-2 my-lg-4" >
            <div class="">{{ $t('offer.amount')}}</div>
            <div v-if="!check_offer_result.error" class="font-weight-bold">€ {{ $n(offer.totalPrice.value) }}</div>
           </div>
          <div>
            <div v-if="check_offer_result.error" class="alert alert-danger" role="alert">{{ check_offer_result.message }}</div>
            <a v-else
          class="btn btn-success rounded w-100 text-center "
          @click="checkout(offer.code)"
          
          >{{ $t('offer.take') }}<i class="la la-angle-right ms-2"></i></a
        >
            
          </div>
        </div>
      </div>
     
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'

export default {
  components : {dayjs},
  props: ['offer','active_offer','check_offer_result'],
  data() {
    return {
      loader : true
    }
  },
  methods : {
        format(date){
            return dayjs(date).format('DD.MM.YYYY')
        },
      close(){
        this.$emit('close')
      },
      checkout(code){
        this.$emit('go',code)
      }
  },
  computed: {
    borderClass(){
      if(this.check_offer_result.error){
        return "border-danger";
      }
      return "border-success";
    },
    headerClass(){
      if(this.check_offer_result.error){
        return "bg-danger";
      }
      return "bg-success";
    }
  }
}
</script>