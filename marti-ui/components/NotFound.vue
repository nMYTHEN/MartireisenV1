<template>
    <section class="error-area section--padding text-center">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-12">
                <div class="error-img">
                    <img class="img-fluid" src="~assets/images/404.jpg"/>
                </div><!-- end error-img-->
                
            </div><!-- end col-lg-7 -->
            <div class="col-lg-6 col-12 align-self-center">
                <div class="section-heading padding-top-35px">
                    <h2 class="sec__title mb-0">{{ $t('404.title')}}</h2>
                    <p class="sec__desc pt-3">{{ $t('404.subtitle')}}</p>
                </div>
                <div class="btn-box padding-top-30px">
                    <a href="/" class="theme-btn"><i class="la la-reply mr-1"></i> {{ $t('404.button')}}</a>
                </div>
            </div>
        </div><!-- end row -->
    </div><!-- end container -->
</section>
</template>

<script>
export default {
  props: [],
};
</script>
