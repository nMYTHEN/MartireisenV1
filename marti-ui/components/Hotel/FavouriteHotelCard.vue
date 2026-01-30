<template>
  <a href="javascript:;"  @click="searchHotel(hotel.hotelId,hotel.name_sef)">
    <div class="card mb-3" style="max-width: 500px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img v-bind:src="image" alt="hotel-img" class="img-fluid rounded-start">
        </div>
        <div class="col-md-8">
          
          <div class="card-body">
            <h6 class="card-title">
              <!-- <a href="javascript:;"  @click="searchHotel(hotel.hotelId,hotel.name_sef)">{{hotel.name}}</a>             -->
              {{hotel.name}}
            </h6>
            <p class="card-meta">{{ hotel.region_name }}, ({{ hotel.region_name}})</p>
            <div class="card-rating pt-1">
              <span class="ratings d-flex align-items-center">
                <i class="la la-star" v-for="i in parseInt(hotel.category) || 0" :key="i"></i>
                <button type="button" @click="removeFav($event)" class="btn-close" style="margin: 5px 5px 0px auto;"></button>
              </span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </a>
</template>
<script>
import dayjs from 'dayjs'
export default {
  props: ["hotel"],
  data() {
    return {
      removed: false,
    }
  },
  methods:{
    removeFav(e){
      this.removed=true;
      e.preventDefault()
      this.$emit("removeFav",this.hotel);
    },
    searchHotel(id, sef) {
      if(this.removed){return;}
        let query2  = search.getSearchObj();
        query2['destination'] = {
            'code': id,
            'type': 'hotel'
        };
        query2['departure']= {
            'code': 'VIE', 
            'name': 'Wien'
        };
        query2['giataIdList']=[id];
        query2['date']={ 
            "start": dayjs().add(5, 'day').format('YYYY-MM-DD'),
            "end": dayjs().add(65, 'day').format('YYYY-MM-DD')
        };
        //location.href = '/hotel/'+sef+'?f='+ JSON.stringify(query2)
        location.href = '/hotel/'+sef+'?'+ search.jsonToUrl(query2)
        query2['giataIdList']= [];
        query2['date']={ 
            "start": dayjs().add(5, 'day').format('YYYY-MM-DD'),
            "end": dayjs().add(30, 'day').format('YYYY-MM-DD')
        };
    },
  },
  computed: {
    image(){
      return this.hotel.pictureUrl.replace('100','100');
    }
  },
};
</script>