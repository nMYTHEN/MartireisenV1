<template>

  <section class="blog-area padding-top-30px padding-bottom-90px">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="section-heading text-center">
                    <h2 class="sec__title line-height-55">{{ $t('homepage.block.magazine')}} </h2>
                     <p class="sec__desc pt-3">
                      {{ $t('homepage.block.magazine_desc')}}
                    </p>
                </div><!-- end section-heading -->
            </div><!-- end col-lg-12 -->
        </div><!-- end row -->
        <div class="row padding-top-50px">
            <div class="col-6 col-lg-3" v-for="(item,index) in posts" v-bind:key="index">
                <div class="card-item blog-card" v-if="item.translate">
                    <div class="card-img">
                        <img :src="'https://martireisen.at/data/image/posts/'+item.id+'/'+item.id+'.jpg'" alt="blog-img">
                        <div class="post-format icon-element">
                            <i class="la la-photo"></i>
                        </div>
                        <div class="card-body">
                            <div class="post-categories">
                                <a href="#" class="badge">Travel</a>
                            </div>
                            <h3 class="card-title line-height-26"><a :href="'/'+item.translate.url+'/'">{{item.translate.name}}</a></h3>
                            <p class="card-meta">
                                <span class="post__date"> {{item.translate.created_at}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <div class="author-content d-flex align-items-center">
                          
                            <div class="author-bio">
                                <a :href="'/'+item.translate.url" class="author__title">{{ $t('common.read_more') }}</a>
                            </div>
                        </div>
                        <div class="post-share">
                            <ul>
                                <li>
                                    <NuxtLink :to="'/'+item.translate.url">
                                        <i class="la la-share icon-element"></i>
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div><!-- end card-item -->
            </div><!-- end col-lg-4 -->
           
        </div><!-- end row -->
        <div class="row">
            <div class="col-lg-12">
                <div class="btn-box text-center pt-4">
                    <a href="/blog" class="theme-btn theme-btn-orange">{{ $t('common.read_more') }}</a>
                </div>
            </div>
        </div>
    </div><!-- end container -->
</section><!-- end blog-area -->
</template>


<script>

export default {
  
  props: ["posts"],
  data() {
    return {
      show: false,
    };
  },
  setup() {
   
  },
};
</script>
