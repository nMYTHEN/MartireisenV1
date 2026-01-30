<template>
<section class="breadcrumb-top-bar ">
      <div class="container">
        <div class="row">
            <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a class="breadcrumb-a-tag" href="/">{{ $t("header.search") }}</a>
                    </li>
                    <li class="breadcrumb-item" v-for="(item,index) in step" :key="index">
                        <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 0 24 24" width="18px" fill="#050505"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z"/></svg>
                        <span v-if="index+1 == step.length" class="la la-map-marker form-icon text-color-12 z-index-1"></span>
                        <span v-if="index+1 == step.length" v-html="item?.name || item || ''"></span>
                        <a class="breadcrumb-a-tag" v-else :href="item.to" v-html="item?.name  || ''"></a>
                    </li>
                </ol>
            </nav>
        </div><!-- end row -->
      </div><!-- end container -->
  </section>
</template>
<script>

export default {
    props : ['step']
}; 

</script>
