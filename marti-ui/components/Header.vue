<template>
  <header class="header-area "><!-- sticky-top-->
    <div class="header-top-bar padding-right-100px padding-left-100px">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="header-top-content">
              <div class="header-left">
                <ul class="list-items">
                  <li>
                    <a :href="'tel:' + $phone"><i class="la la-phone mr-1"></i>{{ $phone }}</a>
                  </li>
                  <li>
                    <a href="mailto:info@martireisen.at"><i class="la la-envelope mr-1"></i>info@martireisen.at</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-6">

            <div class="header-top-content">
              <div class="
                  header-right
                  d-flex
                  align-items-center
                  justify-content-end
                ">
                <div class="header-right-action me-2">
                  <button type="button" class="btn btn-primary position-relative btn-sm rounded-0"
                    data-bs-toggle="modal" data-bs-target="#favouriteHotelsModal">
                    <i v-if="likedHotels && likedHotels?.length > 0" class="la la-heart"></i>
                    <i v-else class="la la-heart-o"></i>
                    <span v-if="likedHotels && likedHotels?.length > 0"
                      class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {{ likedHotels?.length }}
                      <span class="visually-hidden">unread messages</span>
                    </span>
                  </button>
                </div>
                <div class="header-right-action">
                  <div class=" w-auto bg-white me-2">
                    <button class="btn btn-sm dropdown-toggle" type="button" id="language" data-bs-toggle="dropdown"
                      aria-expanded="false">
                      {{ $i18n.locale }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="language">
                      <li><a class="dropdown-item" @click="changeLanguage('de')"><img src="~/assets/images/flags/de.svg"
                            alt="de" width="20" /> Deutsch</a></li>
                      <li><a class="dropdown-item" @click="changeLanguage('tr')"><img src="~/assets/images/flags/tr.svg"
                            alt="de" width="20" /> Türkçe</a></li>
                    </ul>
                  </div>
                </div>
                <div class="header-right-action">
                  <div class=" w-auto bg-white me-2">
                    <button class="btn btn-sm dropdown-toggle" type="button" id="currency" data-bs-toggle="dropdown"
                      aria-expanded="false">
                      EUR
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="currency">
                      <li><a class="dropdown-item" href="#">EUR</a></li>
                    </ul>
                  </div>
                </div>
                <div class="header-right-action">

                  <a href="#" class="btn btn-primary btn-sm rounded-0" data-bs-toggle="offcanvas"
                    data-bs-target="#login-modal">Login</a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="header-menu-wrapper padding-right-100px padding-left-100px py-2 py-lg-4">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="menu-wrapper d-flex justify-content-between">

              <div class="logo">
                <a href="/"><img src="~assets/images/logo.png" alt="logo" /></a>
              </div>
              <div class="d-flex">
                <a class="text-white btn d-lg-none me-1 position-relative" data-bs-toggle="modal"
                  data-bs-target="#favouriteHotelsModal" aria-controls="loginRight" style="font-size: larger;">
                  <i v-if="likedHotels && likedHotels?.length > 0" class="la la-heart"></i>
                  <i v-else class="la la-heart-o"></i>
                  <span v-if="likedHotels && likedHotels?.length > 0"
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style="font-size: small;">
                    {{ likedHotels?.length }}
                    <span class="visually-hidden">unread messages</span>
                  </span>
                </a>
                <a class="text-white btn d-lg-none me-1" data-bs-toggle="offcanvas" data-bs-target="#login-modal"
                  aria-controls="loginRight">
                  <i class="la la-user font-size-26"></i>
                </a>
                <div class="menu-toggler text-white" data-bs-toggle="offcanvas" data-bs-target="#mobile-menu"
                  aria-controls="mobileRight">
                  <i class="la la-bars"></i>
                  <i class="la la-times"></i>
                </div>
              </div>
              <div class="slogan text-white d-none d-lg-block ">
                <h4>{{ $t('header.slogan_one') }}</h4>
                <p>{{ $t('header.slogan_two') }}</p>
              </div>

              <div class="header-contact  align-items-center justify-content-center  d-none d-lg-flex">
                <div class="phone d-flex align-items-center justify-content-center">
                  <h5>{{ $t('header.contact_info') }}</h5>
                  <p>
                    <a class="text-white" href="tel:qweqw">{{ $phone }}</a>
                  </p>
                </div>
              </div>
            </div>



          </div>
          <!-- end col-lg-12 -->
        </div>
        <!-- end row -->
      </div>
      <!-- end container-fluid -->
    </div>
    <!-- end header-menu-wrapper -->
    <div class="header-menu-subwrapper ">


      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="">
              <div class="main-menu-content">
                <nav>
                  <ul v-if="menu" class="d-flex flex-nowrap">
                    <li v-for="(item, index) in menu.data" v-bind:key="index">
                      <a :href="url(item.translate.url)" class="text-white font-weight-bold py-3 px-3">
                        <i :class="item.image_url" class="la mr-1"></i>
                        {{ item.translate.name }}
                      </a>
                      
                      <div class="dropdown-menu-item mega-menu pb-3" v-if="item.children && item.children.length > 0">
                        <div class="position-absolute w-100 opacity-75">
                          <img class="float-end" src="https://www.martireisen.at/data/image/menu/Hotels.jpg" />
                        </div>
                        <div class="px-3 py-2 mt-2 text-color-7">{{ item.translate.title_1 }}</div>
                        <ul class="row no-gutters">
                          <li class="col-lg-3 mega-menu-item">
                            <ul>
                              <li v-show="children.location == 0"
                                v-for="(children, subindex) in item.children.filter(child => child.translate.name && child.translate.url)"
                                :key="subindex">
                                <a :href="children.translate.url"><i class="la la-angle-right me-1"></i> {{
                      children.translate.name }}
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="col-lg-3 mega-menu-item">
                            <ul>
                              <li v-show="children.location == 1"
                                v-for="(children, subindex) in item.children.filter(child => child.translate.name && child.translate.url)"
                                :key="subindex">
                                <a :href="children.translate.url"><i class="la la-angle-right me-1"></i> {{
                      children.translate.name }} </a>
                              </li>
                            </ul>
                          </li>
                          <li class="col-lg-3 mega-menu-item">
                            <ul>
                              <li v-show="children.location == 2"
                                v-for="(children, subindex) in item.children.filter(child => child.translate.name && child.translate.url)"
                                :key="subindex">
                                <a :href="children.translate.url"><i class="la la-angle-right me-1"></i> {{
                      children.translate.name }} </a>
                              </li>
                            </ul>
                          </li>
                          <li class="col-lg-3 mega-menu-item">

                          </li>
                        </ul>
                      </div>

                    </li>
                    <li><a href="/coupon-landing" class="text-white font-weight-bold py-3 px-3">{{ $i18n.locale === 'de' ? 'Gutschein' : 'HEDIYE CEKI' }}</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <MobileMenu :menu="menu" v-if="menu" />
  <UserLoginPopup />
  <UserRegisterPopup />
  <!-- Scrollable modal -->
  <div class="modal fade" id="favouriteHotelsModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <favourite-hotel-list v-if="renderFavouriteHotelList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
const config = useRuntimeConfig();
const language = useCookie("store-language");
const currency = useCookie("currency");
const store = useStore();
let renderFavouriteHotelList = ref(false);
const likedHotels = computed(() => store.getters.likedHotelsList);

const fetchMenuData = async (lang) => {
  const { data, error } = await useFetch(
   `/api/front/menu?hl=${lang || 'de'}`,
    { pick: ["data"] }
  );
  if (error.value) {
    console.error("Error fetching menu data:", error.value);
    return [];
  }
  return data.value?.data || [];
};

const findUrlInMenu = (url, menu) => {
  for (let item of menu) {
    if (item.translate.url === url) {
      return item;
    }
    if (item.children && item.children.length > 0) {
      for (let child of item.children) {
        if (child.translate.url === url) {
          return child;
        }
      }
    }
  }
  return null;
};

const findEquivalentUrl = (sourceItemId, targetMenu) => {
  for (let item of targetMenu) {
    if (item.id === sourceItemId) {
      return item.translate.url;
    }
    if (item.children && item.children.length > 0) {
      for (let child of item.children) {
        if (child.id === sourceItemId) {
          return child.translate.url;
        }
      }
    }
  }
  return null;
};

const changeLanguage = async (param) => {
  const currentPath = window.location.pathname;

  const [menuDe, menuTr] = await Promise.all([
    fetchMenuData('de'),
    fetchMenuData('tr')
  ]);

  const sourceMenu = language.value === 'de' ? menuDe : menuTr;
  const targetMenu = language.value === 'de' ? menuTr : menuDe;
  const sourceItem = findUrlInMenu(currentPath, sourceMenu);
  const newUrl = sourceItem ? findEquivalentUrl(sourceItem.id, targetMenu) : null;

  language.value = param;
  if (newUrl) {
    window.location.href = newUrl;
  } else {
    location.reload();
  }
};


const changeCurrency = (param) => {
  currency.value = param;
  location.reload();
};

const { data: menu } = await useFetch(
  `/api/front/menu?hl=` + (language.value || 'de'), { pick: ["data"] }
);

const url = (url) => {
  let map = {
    "https://www.martigo.at/": "/redirect/flight",
    "/rent-car/": "/redirect/rent",
  };
  if (map[url]) {
    return map[url];
  }
  return url;
};

onMounted(() => {
  let favModal = document.getElementById('favouriteHotelsModal');
  favModal.addEventListener('shown.bs.modal', function () {
    renderFavouriteHotelList.value = true;
  });
  favModal.addEventListener('hidden.bs.modal', function () {
    renderFavouriteHotelList.value = false;
  });
});

watch(likedHotels, (newValue, oldValue) => {
  // 
});

</script>
