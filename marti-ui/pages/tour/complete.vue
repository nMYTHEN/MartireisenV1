<template>
    <BreadCrumbStep step="3" page="Tour"  class="mt-4"/>

    <section class="payment-area  padding-top-40px padding-bottom-70px" v-if="booking">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h4>{{$t['booking.code']}} </h4>
                    <div class="form-box payment-received-wrap my-4">
                        <div class="d-flex align-items-center form-content">
                            <i class="la la-check icon-element bg-3 flex-shrink-0 mr-3 ml-0 mx-5"></i>
                            <div class="ms-4 ms-lg-0">
                                <h3 class="title pb-1">{{ booking.data.code }}</h3>
                                <p class="pb-1" v-html="$t['booking.thankyou']"></p>
                                <p>{{$t['booking.thankyou_message']}}</p>
                                
                            </div>
                        </div>
                    
                    </div>
                    <h4>{{$t['booking.title']}} </h4>
                    <div class="form-box payment-received-wrap my-4">
                        <div class="form-content">
                            <div class="row">
                                <div class="col-6 col-lg-3 border-end p-3">
                                    <img class="img-fluid" v-if="tour" :src="$url+tour.image"  />
                                    <h3 class="title py-3 text-color-9 font-weight-bold text-center ">{{ booking.data.hotel_name }} </h3>
                                    <small class="">{{ booking.data.travel_city }}</small>
                                    
                                </div>
                                <div class="col-6 col-lg-3 border-end p-3" v-if="tour">
                                    <h3 class="title text-color-6 font-weight-bold mb-3">{{ $t['offer.services']}}</h3>
                                    <div v-for="(property,index) in tour.properties" :key="index" v-show="property.is_free"><i class="la la-check me-1"></i>{{ property.title}}</div>
                                   
                                    <h3 class="title text-color-6 font-weight-bold mb-2 mt-4 ">{{ $t['offer.operator']}}</h3>
                                    <div class="d-flex"> 
                                        <div>{{ booking.data.operator}}</div>
                                    </div>

                                </div>
                                <div class="col-6 col-lg-3 border-end p-3">
                                    <h3 class="title text-color-6 font-weight-bold mb-3">Datum</h3>
                                    <div class="font-size-14">
                                        <div>Von :  {{ booking.data.start }} </div>
                                        <div>Bis :   {{  booking.data.end }}</div>     
                                        <div>Dauer :  {{ booking.data.duration }} {{ $t['common.days']}}</div>    
                                    </div>   
                                    <h3 class="title text-color-6 font-weight-bold mb-1 mt-4">Personal Info</h3>
                                    <div>{{ booking.data.name}} {{ booking.data.surname}}</div> 
                                    <div>{{ booking.data.email}}</div>   
                                    <div>{{ booking.data.phone}}</div>                                
                                </div>
                                <div class="col-6 col-lg-3 p-3">
                                    <h3 class="title text-color-6 font-weight-bold pb-2 mb-3">{{ $t['offer.is_available']}}</h3>
                                    <ul class="font-size-14">
                                        <li v-for="(person,index) in booking.data.travellers" :key="index">{{index+1}}.{{person.name}} {{ person.surname }}</li>
                                    </ul>
                                    <hr>
                                    <div class="d-flex justify-content-between">
                                        <div> <span class="title">{{ $t['offer.amount'] }}</span> <br> <small> {{ $t['offer.amount_text'] }}</small></div>
                                        <div class="font-weight-bold">{{ $n(parseFloat(booking.data.amount)) }} {{ booking.data.currency }}</div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>

                    <div class="row">
                        <div class="col-6 col-lg-3">
                            <div class="card">
                                <div class="card-body text-center py-4">
                                    <img  src="~assets/images/marti-small.png"  />
                                    <p class="font-size-12 line-height-22 mt-4">{{ $t['booking.complete.step1'] }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="card">
                                <div class="card-body text-center py-4">
                                    <img  src="~assets/images/marti-small.png"  />
                                    <p class="font-size-12 line-height-22 mt-4 ">{{ $t['booking.complete.step2'] }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="card">
                                <div class="card-body text-center py-4 ">
                                    <img  src="~assets/images/marti-small.png"  />
                                    <p class="font-size-12 line-height-22 mt-4">{{ $t['booking.complete.step3'] }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="card">
                                <div class="card-body text-center py-4">
                                    <img  src="~assets/images/marti-small.png"  />
                                    <p class="font-size-12 line-height-22 mt-4">{{ $t['booking.complete.step4'] }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- end col-lg-12 -->
            </div><!-- end row -->
        </div><!-- end container -->
    </section>

</template>

<script> 

export default {
    data(){
        return {
            booking : null,
            tour : null,
        }
    },
    methods : {
        getBooking(){
            let self = this;
            $fetch('/api/booking/booking/'+this.$route.query.booking).then((r) => {
                self.booking = r;
                self.getTour();
            })
        },
        getTour(){
            let self = this;
            $fetch('/api/booking/tour/tour/fetch/'+this.booking.data.tour_id).then((r) => {
                self.tour = r.data;
            })
        }
    },
    mounted(){
        this.getBooking();
    }
}
</script>