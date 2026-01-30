<template>
    <section class="breadcrumb-top-bar ">
        <div class="container">
            <div class="row">
                <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);"
                    aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a class="breadcrumb-a-tag" href="/">{{ $t("header.search") }}</a>
                        </li>
                        <li class="breadcrumb-item" v-for="(item, index) in step " :key="index">
                            <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 0 24 24" width="18px"
                                fill="#050505">
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
                            </svg>
                            <span v-if="index + 1 == step.length"
                                class="la la-map-marker form-icon text-color-12 z-index-1"></span>
                            <!-- <span v-if="index + 1 == step.length"
                                v-html='$t("common." + item?.name) || item.name || ""'></span> -->
                            <span v-if="index + 1 == step.length"
                                v-html='$t("common." + item.name) !== "common." + item.name ? $t("common." + item.name) : item.name'></span>

                            <a class=" breadcrumb-a-tag" v-else :href="item.to" v-html="item.name || ''"></a>
                        </li>
                    </ol>
                </nav>
            </div><!-- end row -->
        </div><!-- end container -->
    </section>
    <!-- <div class="container">
    <ol class="breadcrumb breadcrumb-arrow">
		<li><a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 12 18">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                    <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
                </svg>
            </a>
        </li>
		<li v-for="(item,index) in step" :key="index">
            <span class="active" v-if="index+1 == step.length" v-html="item.name  || ''"></span>
            <a v-else :href="item.to" v-html="item.name  || ''"></a>
        </li>
	</ol>
</div> -->
</template>
<script>
export default {
    props: ['step'],
};
</script>
