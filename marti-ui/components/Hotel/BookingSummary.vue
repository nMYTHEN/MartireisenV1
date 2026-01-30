<template>
  <div class="form-content">
    <div class="card-item shadow-none radius-none mb-0" v-if="offer">
      <div class="card-img pb-4">
        <a href="#" class="d-block">
          <img v-bind:src="hotelImage" alt="tour-img" />
        </a>
      </div>
      <div class="card-body p-0">
        <div class="d-flex justify-content-between">
          <div>
            <h3 class="card-title">
              {{ offer.commonOffer.hotelOffer.hotel.name }}
            </h3>
            <p class="card-meta">
              {{ offer.commonOffer.hotelOffer.hotel.location.name }} -
              {{ offer.commonOffer.hotelOffer.hotel.location.region.name }}
            </p>
            <div class="card-rating pt-1">
              <span class="ratings d-flex align-items-center">
                <i
                  class="la la-star"
                  v-for="i in parseInt(
                    offer.commonOffer.hotelOffer.hotel.category
                  ) || 0"
                  :key="i"
                ></i>
              </span>
            </div>
          </div>
        </div>

        <div class="section-block"></div>
        <div class="my-2"
          v-if="offer.commonOffer.flightOffer"
        >
          <h3 class="title font-size-16 text-color-6 font-weight-bold mb-3">
            {{ $t("offer.flight_info") }}
          </h3>
          <div class="font-weight-bold font-size-16">
            {{ $t("offer.flight_point") }} :
          </div>
          <div
            v-for="(flight, index) in offer.commonOffer.flightOffer.flight
              .outbound.legList"
            :key="index"
            class=""
          >
            <div class="d-flex justify-content-between">
              <div>
                <div class="font-weight-bold">
                  {{ formatFlightDate(flight.departureDate) }}
                </div>
                  {{ flight.flightCarrierName }}
                  <small>{{ flight.flightNumber }}</small>
              </div>
              <div></div>
            </div>
            <div class="d-flex justify-content-between bg-rgb-6 px-4 py-2 font-size-12 line-height-20">
              <div class="col-5">
                <div class="font-weight-bold">
                  {{ flight.departureAirportCode }}
                </div>
                <div>{{ flight.departureAirportName }}</div>
                <div class="text-color-12 font-weight-bold">
                  {{ flight.departureTime }}
                </div>
              </div>
              <div class="col-2">
                <i class="la la-plane-departure font-size-24"></i>
              </div>
              <div class="col-5">
                <div class="font-weight-bold">
                  {{ flight.arrivalAirportCode }}
                </div>
                <div>{{ flight.arrivalAirportName }}</div>
                <div class="text-color-12 font-weight-bold">
                  {{ flight.arrivalTime }}
                </div>
              </div>
            </div>
          </div>
          <div class="font-weight-bold font-size-16 mt-3">
            {{ $t("offer.flight_return") }}:
          </div>
          <div
            v-for="(flight, index) in offer.commonOffer.flightOffer.flight
              .inbound.legList"
            :key="index"
            class=""
          >
            <div class="d-flex justify-content-between">
              <div>
                <div class="font-weight-bold">
                  {{ formatFlightDate(flight.departureDate) }}
                </div>
                  {{ flight.flightCarrierName }}
                  <small>{{ flight.flightNumber }}</small>
              </div>
              <div></div>
            </div>
            <div class="d-flex justify-content-between bg-rgb-6 px-4 py-2 font-size-12 line-height-20">
              <div class="col-5">
                <div class="font-weight-bold">
                  {{ flight.departureAirportCode }}
                </div>
                <div>{{ flight.departureAirportName }}</div>
                <div class="text-color-12 font-weight-bold">
                  {{ flight.departureTime }}
                </div>
              </div>
              <div class="col-2">
                <i class="la la-plane-departure font-size-24"></i>
              </div>
              <div class="col-5">
                <div class="font-weight-bold">
                  {{ flight.arrivalAirportCode }}
                </div>
                <div>{{ flight.arrivalAirportName }}</div>
                <div class="text-color-12 font-weight-bold">
                  {{ flight.arrivalTime }}
                </div>
              </div>
            </div>
          </div>
          <div class="my-2">
            <small>{{ $t("offer.flight_time") }}</small>
          </div>
        </div>
        <ul class="list-items list-items-2 py-2 font-size-14"  v-if="!offer.commonOffer.flightOffer">
          <li>
            <span>Check in:</span>{{ format(offer.commonOffer.travelDate.fromDate) }}
          </li>
          <li>
            <span>Check out:</span>{{ format(offer.commonOffer.travelDate.toDate)  }}
          </li>
          <li>
            <span>{{ $t('search.duration')}}:</span>{{ offer.commonOffer.travelDate.duration }}
            {{ $t("common.days") }}
          </li>
        </ul>
        <div class="section-block"></div>
        <h3 class="title text-color-6 font-weight-bold my-3">
          {{ $t("offer.services")}}
        </h3>
        <div v-if="offer" class="font-size-14">
          <i class="la la-check me-1"></i
          >{{ offer.commonOffer.hotelOffer.boardType.name }}
        </div>
        <div v-if="offer" class="font-size-14">
          <i class="la la-check me-1"></i
          >{{ offer.commonOffer.hotelOffer.roomType.name }}
        </div>
        <div v-if="offer" class="font-size-14">
          <i class="la la-check me-1"></i
          >{{ offer.commonOffer.hotelOffer.inclusiveList.join(",") }}
        </div>
        <HotelFacility 
              :keyword_list="hotel.keywordList" 
              :show_modal_button="true" 
              :hotel_code="offer.commonOffer.hotelOffer.hotel.code"
              max_count="4"
              label_class="title font-size-16 text-color-6 font-weight-bold mb-3"/>
        <h3 class="title text-color-6 font-weight-bold mb-2 mt-4">
          {{ $t("offer.operator") }}
        </h3>
        <div class="">
          <div>{{ offer.commonOffer.tourOperator.name }}</div>
          <img :src="offer.commonOffer.tourOperator.png" class="my-2" />
        </div>
      </div>
    </div>
    <!-- end card-item -->
  </div>
</template>

<script>
import dayjs from 'dayjs'
import imgresizer from '/utils/trafficImageResize';
export default {
  components : { dayjs },
  props: ["offer","hotel"],
  methods : {
    format(date){
        return dayjs(date).format('DD-MM-YYYY')
    },
    formatFlightDate(date){
        return dayjs(date).format('DD.MM.YYYY')
    },
  },
  computed: {
    hotelImage(){
      if(this.hotel.catalogData?.imageList != null && this.hotel.catalogData?.imageList.length > 0){
        return this.hotel.catalogData?.imageList[0];}
      if(this.hotel.mediaData != null && this.hotel.mediaData.pictureUrl != null){
        return imgresizer.resize(this.hotel.mediaData.pictureUrl,'300');
      }
      return "~assets/images/img1.jpg"
    },
  },
};
</script>
