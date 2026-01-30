<template>
  <div v-if="menu">
    <div class="offcanvas offcanvas-end" id="mobile-menu">
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Menü</h5>
        <a
          type="button"
          class="btn"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          ><i class="la la-close"></i
        ></a>
      </div>
      <div class="offcanvas-body">
        <div class="list-group">
          <div
            class="border-bottom"
            v-for="(item, index) in menu.data"
            v-bind:key="index"
          >
            <a
              v-if="item.children && item.children.length > 0"
              class="btn text-start w-100"
              data-bs-toggle="offcanvas"
              :data-bs-target="'#mobile-menu-' + index"
            >
              <i class="la me-2" :class="item.image_url"></i>
              {{ item.translate.name }}
              <i class="la la-angle-down float-end"></i>
            </a>
            <a
              v-if="item.has_children == 0"
              class="btn text-start w-100"
              :href="url(item.translate.url)"
            >
              <i class="la me-2 " :class="item.image_url"></i>
              {{ item.translate.name }}
            </a>
          
          </div>
          <div class="border-bottom">
            <a class="btn text-start w-100" href="/coupon-landing">
              <i class="la me-2"></i>{{ $i18n.locale === 'de' ? 'Gutschein' : 'HEDIYE CEKI' }}
            </a>
          </div>
          <div class="border-bottom">
            <a class="btn text-start w-100" data-bs-toggle="offcanvas" data-bs-target="#mobile-menu-footer0">
              <i class="la me-2"></i>{{ $t("footer.title_one") }}<i class="la la-angle-down float-end"></i>
            </a>
          </div>
          <div class="border-bottom">
            <a class="btn text-start w-100" data-bs-toggle="offcanvas" data-bs-target="#mobile-menu-footer1">
              <i class="la me-2"></i>{{ $t("footer.title_two") }}<i class="la la-angle-down float-end"></i>
            </a>
          </div>
          <div class="border-bottom">
            <a
              class="btn text-start w-100"
              href="/kontakt"
            >
            <i class="la me-2 la-phone"></i>
              Kontakt
            </a>
          </div>
        </div>
        <div class="d-flex justify-content-center my-5">
            <img v-if="language == 'de'" width="32" src="~assets/images/flags/de.svg"/>
            <img v-if="language == 'tr'" width="32" src="~assets/images/flags/tr.svg"/>
            <button
              class="btn btn-sm dropdown-toggle  me-3"
              type="button"
              id="language"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
            {{ $i18n.locale }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="language">
                <li><a class="dropdown-item" @click="changeLanguage('de')">Deutsch</a></li>
                <li><a class="dropdown-item" @click="changeLanguage('tr')">Türkçe</a></li>
            </ul>
            €
            <button
              class="btn btn-sm dropdown-toggle"
              type="button"
              id="currency"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              EUR
            </button>
            <ul class="dropdown-menu" aria-labelledby="currency">
              <li><a class="dropdown-item" href="#">EUR</a></li>
            </ul>
        </div>
        <div class="text-center font-size-20 py-3">
          <i class="la la-headset me-2"></i> {{ $phone }}
        </div>
      </div>
    </div>
    <div v-for="(item, index) in menu.data" v-bind:key="index">
      <div
        class="offcanvas offcanvas-end"
        :id="'mobile-menu-' + index"
        v-if="item.children && item.children.length > 0"
      >
        <div class="offcanvas-header">
          <a
            type="button"
            class="btn"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobile-menu"
            aria-controls="mobile-menu"
            ><i class="la la-angle-left"></i
          ></a>

          <h5 id="offcanvasRightLabel">{{ item.translate.name }}</h5>
          <a
            type="button"
            class="btn"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            ><i class="la la-close"></i
          ></a>
        </div>
        <div class="offcanvas-body">
          <div class="list-group">
            <a
              v-for="(children, subindex) in item.children"
              v-bind:key="subindex"
              :href="children.translate.url"
              class="btn text-start"
            >
              {{ children.translate.name }}
              <i class="la la-angle-right me-2 float-end"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="offcanvas offcanvas-end" id="mobile-menu-footer0">
      <div class="offcanvas-header">
        <a type="button" class="btn" data-bs-toggle="offcanvas" data-bs-target="#mobile-menu" aria-controls="mobile-menu">
          <i class="la la-angle-left"></i>
        </a>
        <h5 id="offcanvasRightLabel">{{ $t("footer.title_one") }}</h5>
        <a type="button" class="btn" data-bs-dismiss="offcanvas" aria-label="Close">
          <i class="la la-close"></i>
        </a>
      </div>
      <div class="offcanvas-body">
        <div class="list-group">
          <a v-for="(children, subindex) in menuFooter.data[0]"
            v-bind:key="subindex"
            :href="children.translate.url"
            class="btn text-start"
          >
            {{ children.translate.name }}
            <i class="la la-angle-right me-2 float-end"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="offcanvas offcanvas-end" id="mobile-menu-footer1">
      <div class="offcanvas-header">
        <a type="button" class="btn" data-bs-toggle="offcanvas" data-bs-target="#mobile-menu" aria-controls="mobile-menu">
          <i class="la la-angle-left"></i>
        </a>
        <h5 id="offcanvasRightLabel">{{ $t("footer.title_one") }}</h5>
        <a type="button" class="btn" data-bs-dismiss="offcanvas" aria-label="Close">
          <i class="la la-close"></i>
        </a>
      </div>
      <div class="offcanvas-body">
        <div class="list-group">
          <a v-for="(children, subindex) in menuFooter.data[1]"
            v-bind:key="subindex"
            :href="children.translate.url"
            class="btn text-start"
          >
            {{ children.translate.name }}
            <i class="la la-angle-right me-2 float-end"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>

const language = useCookie("store-language");
const props = defineProps(['menu']);
const config = useRuntimeConfig();

const changeLanguage = (param) => {
  language.value = param;
  location.reload();
};

const { data: menuFooter } = await useFetch(
  `/api/front/footer?hl=` + (language.value || "de"),
  { pick: ["data"] }
);

const url = (url) => {
    let map = {
      'https://www.martigo.at/' : '/redirect/flight',
      '/rent-car/' : '/redirect/rent'
    }
    if(map[url]){
      return map[url];
    }
    return url;
}

</script>
