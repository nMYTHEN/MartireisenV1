<template>
    <div class="form-content">
      <div class="card-item shadow-none radius-none mb-0 " v-if="tour">
        <div class="card-img pb-4">
          <a href="#" class="d-block">
            <img :src="$url+tour.image" alt="tour-img" />
          </a>
        </div>
        <div class="card-body p-0">
          <div class="d-flex justify-content-between">
            <div>
              <h3 class="card-title">
                {{ tour.title }}
              </h3>
              <p class="card-meta">
                {{ tour.departure_place }} >
                {{ tour.destination }}
              </p>
              <div class="card-rating pt-1">
                <span class="ratings d-flex align-items-center">
                  <i
                    class="la la-star"
                    v-for="i in 5"
                    :key="i"
                  ></i>
                </span>
              </div>
            </div>
          </div>
  
          <div class="section-block"></div>
          <h3 class="title text-color-6 font-weight-bold my-3">
            {{ $t("tour.reservation_information") }}
          </h3>
       <ul class="list-items list-items-2 py-2 font-size-14"  >
            <li>
              <span><i class="la la-calendar"></i>{{  $t('tour.departure_date') }}:</span>{{ (tour.period.start_date_pretty) }}
            </li>
            <li><i class="la la-calendar"></i>
              <span>{{ $t('search.duration')}}:</span>{{ tour.plans.length }}
              {{ $t("common.days") }}
            </li>
           
          </ul>
           
          <div class="section-block"></div>
          <h3 class="title text-color-6 font-weight-bold my-3">
            {{ $t("offer.services") }}
          </h3>
       
          <div class="font-size-14" v-show="property.is_free == 1" v-for="(property,index) in tour.properties" :key="index">
            <i class="la la-check me-1"></i
            >{{property.title }}
          </div>    
          <div class="section-block"></div>
          <h3 class="title text-color-6 font-weight-bold my-3">
            {{ $t("tour.payment_information") }}
          </h3>
       
          <div class="font-size-14" >
            <div> {{  search.adults  }} {{  $t('search.adult') }}</div>
            <div> {{  search.children }} {{  $t('search.children') }}</div>
          </div>
          <div class="section-block"></div>
          <div class="d-flex justify-content-between mt-4">
            <h3 class="title font-weight-bold">
            {{ $t("offer.amount") }}<br> <small>{{  $t('offer.amount_text') }}</small>
          </h3>
          <div class="font-size-24 font-weight-bold">
            € {{ price }}
          </div>
          </div>
      
        </div>
      </div>
      <!-- end card-item -->
    </div>
  </template>
  
  <script>
  import dayjs from 'dayjs'
  
  export default {
    data(){
        return {
            price : 0,
        }
    },
    components : { dayjs },
    props: ["tour","search"],
   
    methods : {
      format(date){
          return dayjs(date).format('DD-MM-YYYY')
      }
    },
    mounted(){

        let period = this.tour.periods.filter((item) => {
            return item.id == this.search.period_id;
        });

        let station = period[0].stations.filter((item) => {
            return item.id == this.search.station_id
        });

        this.price =  parseInt(station[0].price) *  this.search.adults + (parseInt(station[0].child_price) * this.search.children);
    }
  };
  </script>
  