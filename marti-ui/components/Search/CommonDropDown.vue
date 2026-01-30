<template>
  <div class="dropdown-menu dropdown-menu-wrap py-1 px-3">
    <div class="list-group list-group-flush">
      <a href="javascript:;" tabindex="0"
        @click="select({value:null,title:null})"
        class="
          list-group-item list-group-item-action
          font-size-13
          py-0
          px-0
          border-0
        "
      >
        <b>{{ $t('search.clear') }}</b>
      </a>
      <a href="javascript:;" tabindex="0"
        @click="select(d)"
        class="
          list-group-item list-group-item-action
          font-size-13
          py-0
          px-0
          border-0
        "
        v-for="(d, index) in data"
        :key="index"
      >
        {{ d.title }}
      </a>
    </div>
  </div>
</template>
  <script>
  export default {
    props : [ 'data'],
    methods : {
      select(obj){
          this.$emit('select',obj)
      }
    }
  };
  </script>
  