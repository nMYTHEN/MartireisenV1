<template>
    <div class="card-item card-item-list border border-danger rounded-3" style="border-color: red !important;">
        <div class="card-body p-3 p-lg-4">
            <figure class="text-center mt-4">
                <blockquote class="blockquote">
                    <p>{{$t('search.no_result_found_title')}}</p>
                </blockquote>
                <figcaption class="blockquote-footer">
                   <cite >{{$t('search.no_result_found')}}</cite>
                </figcaption>
                <a class="btn btn-primary stretched-link" href="/">{{ $t('menu.home') }}</a>
                
            </figure>
        </div>
        <div class="card-img">
            <img src="@/assets/images/not-found.png" />
        </div>
  </div>
</template>
  
  <script setup>
  </script>
  