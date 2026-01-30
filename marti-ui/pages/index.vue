<template>
  <div> 
    <section class="hero-wrapper">
      <div class="hero-box hero-bg">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 mx-auto responsive--column-l">
              <SearchEngine />
            </div>
          </div>
        </div>
        <svg
          class="hero-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
        </svg>
      </div>
    </section>
    <!-- end hero-wrapper -->

    <section
      class="info-area info-bg pt-4 text-center d-none d-lg-flex"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-4">
            <div class="icon-box">
              <div class="info-icon">
                <i class="la la-bullhorn"></i>
              </div>
              <!-- end info-icon-->
              <div class="info-content">
                <h4 class="info__title">{{ $t('slogans.section1_title')}}</h4>
                <p class="info__desc">
                  {{ $t('slogans.section1_text')}}
                </p>
              </div>
              <!-- end info-content -->
            </div>
            <!-- end icon-box -->
          </div>
          <!-- end col-lg-4 -->
          <div class="col-lg-4">
            <div class="icon-box margin-top-50px">
              <div class="info-icon">
                <i class="la la-globe"></i>
              </div>
              <!-- end info-icon-->
              <div class="info-content">
                <h4 class="info__title">{{ $t('slogans.section2_title')}}</h4>
                <p class="info__desc">
                {{ $t('slogans.section2_text') }}
                </p>
              </div>
              <!-- end info-content -->
            </div>
            <!-- end icon-box -->
          </div>
          <!-- end col-lg-4 -->
          <div class="col-lg-4">
            <div class="icon-box">
              <div class="info-icon">
                <i class="la la-thumbs-up"></i>
              </div>
              <!-- end info-icon-->
              <div class="info-content">
                <h4 class="info__title">{{ $t('slogans.section3_title')}}</h4>
                <p class="info__desc">
                  {{ $t('slogans.section3_text')}}
                </p>
              </div>
              <!-- end info-content -->
            </div>
            <!-- end icon-box -->
          </div>
          <!-- end col-lg-4 -->
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </section>

    <LandingPopularHotelList ref="hotelList"/>
    <LandingPopularTourList ref="tourList"/>

   <!-- <SectionPopularHotel />-->
    <SectionHolidayTypes />

    

    <!-- <SectionHomeSeoText />-->
    <SectionLatestPost :posts="post.data" v-if="post" />
    
  </div>
</template>

<script setup>

const cookie = useCookie('store-language');
const { data: post } = await useFetch(`/api/content/post/post?limit=4&hl=`+(cookie.value || ' de'), {
  pick: ["data"],
});
</script> 
