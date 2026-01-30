<template>
    <section class="breadcrumb-area ">
    <div class="breadcrumb-wrap">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb-content d-flex flex-wrap align-items-center justify-content-between">
                        <div class="section-heading text-left">
                            <h2 class="sec__title text-white">{{title}}</h2>
                            <p class="sec__desc text-white font-weight-regular pb-2">
                                <span v-for="(step,index) in steps" :key="index">
                                {{ step }}<i class="la la-angle-right ml-1" v-if="index+1 != steps.length"></i>
                                </span>
                            </p>
                        </div>
                        
                    </div><!-- end breadcrumb-content -->
                </div><!-- end col-lg-12 -->
            </div><!-- end row -->
        </div><!-- end container -->
    </div><!-- end breadcrumb-wrap -->
    <div class="bread-svg-box">
        <svg class="bread-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" preserveAspectRatio="none"><polygon points="100 0 50 10 0 0 0 10 100 10"></polygon></svg>
    </div><!-- end bread-svg -->
</section>
</template>


<script>

export default {
  props: ["title","steps"],
};
</script>
