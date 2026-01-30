<template>
  <section class="destination-area section--padding">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-8">
          <div class="section-heading">
            <h1 class="sec__title">
              {{ $t('homepage.block.header')}}
            </h1>
            <p class="sec__desc pt-3">
               {{ $t('homepage.block.header_desc')}}
            </p>
          </div>

          <!-- end section-heading -->
        </div>
        <!-- end col-lg-8 -->
        <div class="col-lg-4">
          <div class="btn-box btn--box float-end">
            <a href="/pauschalreisen" class="theme-btn theme-btn-orange font-weight-bold d-none d-lg-inline-block">{{$t('common.more')}}</a>
          </div>
        </div>
      </div>
      <!-- end row -->
      <div class="row padding-top-50px">
        <div class="col-lg-8">
          <div class="row">
            <div class="col-lg-6" v-for="(item,index) in items" v-bind:key="index">
              <div class="card-item ">
                <div class="card-img">
                  <img
                    :src="item.image"
                    alt="destination-img"
                  />
                 
                </div>
                 <div class="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <h3 class="card-title"><a :href="item.url" v-html="item.name"></a></h3>
                        </div>
                        <div>
                            <a :href="item.url" class="theme-btn theme-btn-small theme-btn-orange border-0">{{ $t('common.more')}}</a>
                        </div>
                    </div>
                
              </div>
            </div>
          </div>

          <!-- end card-item -->

          <!-- end card-item -->
        </div>
        <!-- end col-lg-4 -->
        <div class="col-lg-4">
          <div class="card-item destination-card">
            <div class="card-img">
              <img height="575"
                :src="banner.image"
                alt="destination-img"
              />
            </div>
            <div class="card-body" style="bottom:5px">
              <h3 class="card-title">
                <a :href="banner.url" v-html="banner.name"></a>
                
              </h3>
              <p class="text-white" v-html="banner.desc"></p>
              <div
                class=" card-price mt-3  "
              >
                 <a :href="banner.url" class="theme-btn text-center theme-btn-small  theme-btn-orange border-0 w-50">{{ $t('common.more')}}</a>
              </div>
            </div>
          </div>
          <!-- end card-item -->
        </div>
        <!-- end col-lg-4 -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </section>
</template>
<script>

export default {
  
  props: [],
  data() {
    return {
      banner : {
        name :this.$t('homepage.card2_title'),
        desc : this.$t('homepage.card2_description'),
        url : '/wellnesshotels/',
        image : 'https://www.martireisen.at/data/image/posts/7/7.jpg'
      },  
      items: [
        {
            name : this.$t('homepage.card1_title'),
            url  : "/pauschalreisen/familienurlaub/",
            image : "/images/homebanner/famillienhotels.jpg",
        },
        {
            name : this.$t('homepage.card3_title'),
            url  : "/fernreisen/",
            image : "/images/homebanner/fernreisen.jpg",
        },
         {
            name : this.$t('homepage.card4_title'),
            url  : "/sports-aktivurlaub/",
            image : "/images/homebanner/aktivurlaub.jpg",
        },
         {
            name : this.$t('homepage.card5_title'),
            url  : "/strandhotels/",
            image : "/images/homebanner/strandurlaub.jpg",
        },
      ],
    };
  },
  setup() {
   
  },
};
</script>
