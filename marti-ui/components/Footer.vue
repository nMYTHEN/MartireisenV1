<template>
  <footer class="footer-wrapper footer-area">
    <div class="footer-top section-bg-3 py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-3 col--6 phone-numbers">
            <h4 class="footer-top-title">{{ $t("footer.phone_numbers") }}</h4>
            <ul class="footer-top-list">
              <li>
                <a href="tel:+43 1 90 94 500" title=""
                  ><img
                    src="~assets/images/flags/au-circle.svg"
                    alt="Marti Reisen Osterrich"
                    width="25"
                  />
                  <span class="mx-2">+43 1 90 94 500 50</span></a
                >
              </li>
              <li>
                <a href="tel:+49 69 333 98 011" title=""
                  ><img
                    src="~assets/images/flags/de-circle.svg?v=2"
                    alt="Marti Reisen Deutschland"
                    width="25"
                  />
                  <span class="mx-2">+49 69 333 98 011 50</span></a
                >
              </li>
              <li>
                <a href="tel:+90 850 840 62 91" title=""
                  ><img
                    src="~assets/images/flags/tr-circle.png"
                    alt="Marti Reisen Türkiye"
                    width="25"
                  />
                  <span class="mx-2">+90 850 840 62 91 50</span></a
                >
              </li>
              <li>
                <a href="tel:{{ $phone }}" title=""
                  ><img
                    src="~assets/images/flags/global-circle.svg"
                    alt="Marti Reisen Global"
                    width="25"
                  />
                  <span class="mx-2">{{ $phone }}</span></a
                >
              </li>
            </ul>
          </div>
          <div class="col-md-3 col--6 my-3 my-lg-0">
            <h4 class="footer-top-title">{{ $t("footer.title_one") }}</h4>
            <ul class="footer-top-list" v-if="menu">
              <li v-for="(item, index) in menu.data[0]" :key="index">
                <a :href="item.translate.url" title="">
                  {{ item.translate.name }}</a
                >
              </li>
              <!-- <li>
                <a href="/ueber-martireisen/" title="">{{ $t('footer.about_us') }}</a>
              </li>
              <li><a href="/buchungsablauf/" title="">{{ $t('footer.booking_process') }}</a></li>
              <li>
                <a href="https://www.martireisen.at/" title="">{{ $t('footer.homepage') }} </a>
              </li>
              <li>
                <a href="/warum-martireisen/" title="">{{ $t('footer.why_us') }}</a>
              </li>-->
              <li>
                <a v-bind:href="$t('footer.martigo_url')" title="">{{
                  $t("footer.martigo_text")
                }}</a>
              </li>
            </ul>
          </div>
          <div class="col-md-3 col--6 my-3 my-lg-0">
            <h4 class="footer-top-title">{{ $t("footer.title_two") }}</h4>
            <ul class="footer-top-list" v-if="menu">
              <li v-for="(item, index) in menu.data[1]" :key="index">
                <a :href="item.translate.url" title="">
                  {{ item.translate.name }}</a
                >
              </li>
            </ul>
          </div>
          <div class="col-md-3 col--12">
            <h4 class="footer-top-title light mb-4">
              {{ $t("footer.subscribe") }}
            </h4>
            <div class="contact-form-action">
              <form action="#">
                <div class="input-box">
                  <div class="form-group mb-0">
                    <span class="la la-envelope form-icon"></span>
                    <input
                      v-model="subcriber_email"
                      id="emailinput"
                      class="form-control"
                      type="email"
                      name="email"
                      placeholder="E-Mail"
                    />
                    <button
                      @click="submit_email"
                      class="theme-btn theme-btn-small submit-btn"
                      type="button"
                    >
                      {{ $t("footer.subscribe_button") }}
                    </button>
                    <span class="font-size-14 pt-1 text-white-50"
                      ><i class="la la-lock mr-1"></i
                      >{{ $t("footer.subscribe_info") }}</span
                    >
                    <!-- inja bayad message nemayesh dahad. agar success bood payam successe sabz va agar nabood, payame khataye ghermez -->
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-top section-bg-3 py-4">
      <div class="container">
        <div class="footer-middle-container">
          <p class="footer-middle-copyright">
            {{ $t("footer.copyright") }}
          </p>
          <div class="footer-middle-social">
            <a
              class="footer-middle-social-item"
              href="https://www.facebook.com/martireisen"
              target="_blank"
              title="Social"
              ><i class="fab fa-facebook"></i
            ></a>
            <a
              class="footer-middle-social-item"
              href="https://www.instagram.com/martireisen/"
              target="_blank"
              title="Social"
              ><i class="fab fa-instagram"></i
            ></a>
            <a
              class="footer-middle-social-item"
              href="https://www.youtube.com/channel/UCtk_xNN1jfA6DH0KxmSDHfg"
              target="_blank"
              title="Social"
              ><i class="fab fa-youtube"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom py-4">
      <div class="container">
        <div class="row">
          <div class="col-md-2 justify-content-center text-center">
            <h4 class="footer-bottom-title">
              {{ $t("common.ssl_certificate") }}
            </h4>
            <div class="img-div d-flex justify-content-center">
              <img
                class="img-fluid"
                src="~assets/images/payment/ssl.svg"
                alt="SSL Certificate"
              />
            </div>
          </div>
          <div class="col-md-5 justify-content-center text-center">
            <h4 class="footer-bottom-title">
              {{ $t("common.payment_methods") }}
            </h4>
            <div class="img-div d-flex justify-content-center">
              <img
                class="img-fluid"
                src="~assets/images/payment/mastercard.svg"
                alt="MasterCard"
              />
              <img
                class="img-fluid"
                src="~assets/images/payment/visa.svg"
                alt="Visa"
              />
              <img
                class="img-fluid"
                src="~assets/images/payment/klarna.svg"
                alt="Klarna"
              />
              <img
                class="img-fluid"
                src="~assets/images/payment/paypal.svg"
                alt="Paypal"
              />
            </div>
          </div>
          <div class="col-md-5 justify-content-center text-center">
            <h4 class="footer-bottom-title">
              {{ $t("common.security_certs") }}
            </h4>
            <div class="img-div d-flex justify-content-center">
              <img
                class="img-fluid"
                src="~assets/images/payment/iata.svg"
                alt="Iata"
              />
              <img
                class="img-fluid"
                style="width: 150px"
                src="~assets/images/payment/OERV_Logo_4c.jpg"
                alt="ORV"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <a
      class="position-fixed whatsapp-button"
      href="https://wa.me/4312366060?text=Hallo"
      target="_blank"
    >
      <i class="la la-whatsapp my-2"></i>
    </a>
    <button
      type="button"
      class="position-fixed border-0 shadow-0 top-button"
      style="right: 85px"
      id="btn-back-to-top"
    >
      <i class="la la-arrow-up"></i>
    </button>
  </footer>
  <vue-cookie-accept-decline
  :debug="false"
  :disableDecline="false"
  :showPostponeButton="false"
  @clicked-accept="cookieClickedAccept"
  @clicked-decline="cookieClickedDecline"
  @clicked-postpone="cookieClickedPostpone"
  @removed-cookie="cookieRemovedCookie"
  @status="cookieStatus"
  elementId="myPanel1"
  position="bottom"
  ref="myPanel1"
  transitionName="slideFromBottom"
  type="bar"
>
  <!-- Optional -->
  <template #postponeContent>&times;</template>

  <!-- Optional -->
  <template #message>
    <b>{{$t("footer.cookie_policy_title")}}</b> <br />
    {{ $t("footer.cookie_policy_desc")}}
    <a href="/datenschutz" target="_blank"> <b>{{ $t("common.show_more") }}...</b></a>
  </template>

  <!-- Optional -->
  <template #declineContent>{{ $t("footer.cookie_reject")}}</template>

  <!-- Optional -->
  <template #acceptContent>{{ $t("footer.cookie_accept")}}</template>
</vue-cookie-accept-decline>
</template>

<script setup>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import VueCookieAcceptDecline from 'vue-cookie-accept-decline';
import 'vue-cookie-accept-decline/dist/vue-cookie-accept-decline.css';
const subscriber_successfull = computed(() => t("user.subscriber_successfull"));
const subscriber_exists = computed(() => t("user.subscriber_exists"));
const email_is_not_valid = computed(() => t("user.subscriber_email_not_valid"));

const { t } = useI18n();
let subcriber_email = "";
const language = useCookie("store-language");

const { data: menu } = await useFetch(
  `/api/front/footer?hl=` + (language.value || "de"),
  { pick: ["data"] }
);

const cookieClickedAccept = () => {
  // Handle cookie acceptance
};

const cookieClickedDecline = () => {
  // Handle cookie declineö
};

const cookieClickedPostpone = () => {
  // Handle postpone
};

const cookieRemovedCookie = () => {
  // Handle cookie removal
};

const cookieStatus = (status) => {
  // Handle status change
};

function submit_email() {
  let email_is_valid = /^[^@]+@\w+(\.\w+)+\w$/.test(subcriber_email);
  if(!email_is_valid)
  {
    toast.error(email_is_not_valid, { autoClose: 5000 });
    return;
  }
  $fetch("/api/engine/subscribers/addSubscriber", {
    method: "POST",
    body: { email: subcriber_email },
  }).then(function (result) {
    if (result.status) {
      document.getElementById("emailinput").value = "";
      subcriber_email = "";
      toast.success(subscriber_successfull, { autoClose: 5000 });
    } else {
      toast.error(subscriber_exists, { autoClose: 5000 });
    }
  });
}

onMounted(() => {
  let mybutton = document.getElementById("btn-back-to-top");

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
  // When the user clicks on the button, scroll to the top of the document
  mybutton.addEventListener("click", backToTop);

  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
});
</script>
<style scoped>
.cookie__bar{
  background-color: #000845e3;
  color: azure;
}
</style>