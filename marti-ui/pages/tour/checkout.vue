<template>
  <BreadCrumbNew :step="step" v-if="tour" />
  <section class="booking-area padding-top-20px padding-bottom-70px">
    <div class="container">
      <button type="button" data-bs-toggle="offcanvas" data-bs-target="#summary-modal"
        class="btn btn-light w-100 rounded-0 my-2 d-block d-lg-none">
        <i class="la la-info-circle"></i> {{ $t("booking.title") }}
      </button>

      <div class="row">
        <div class="col-lg-12" v-if="loader">
          <div class="d-flex align-items-center justify-content-center form-box p-3" style="min-height:500px">
            <div class="me-4">
              <div class="marti-loader"></div>
            </div>
            <div class="ms-4">
              <h4>{{ $t('common.loading') }}...</h4>
              <p>{{ $t('common.loading_spinner') }}</p>
            </div>
          </div>
        </div>

        <div class="col-lg-8">
          <div class="form-box">
            <div class="form-title-wrap py-3">
              <h3 class="title text-color-6 font-weight-bold">
                {{ $t("user.profile.title") }}
              </h3>
            </div>
            <!-- form-title-wrap -->

            <div class="form-content">
              <div class="contact-form-action">
                <form method="post">
                  <div class="row">
                    <div class="col-lg-6 responsive-column">
                      <div class="input-box">
                        <label class="label-text">{{
                          $t("user.profile.name")
                        }}</label>
                        <div class="form-group">
                          <span class="la la-user form-icon"></span>
                          <input v-model="bookingForm.personal.name" @change="checkFirstTraveller"
                            ref='bookingForm.personal.name' class="form-control"
                            :class="{ 'border-danger': v$.bookingForm.personal.name.$errors.length }" type="text"
                            :placeholder="$t('user.profile.name.placeholder')" />
                          <div class="text-danger font-size-14" v-for="error of v$.bookingForm.personal.name.$errors"
                            :key="error.$uid">
                            <div class="error-msg">* {{ $t(error.$propertyPath) }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- end col-lg-6 -->
                    <div class="col-lg-6 responsive-column">
                      <div class="input-box">
                        <label class="label-text">{{
                          $t("user.profile.surname")
                        }}</label>
                        <div class="form-group">
                          <span class="la la-user form-icon"></span>
                          <input v-model="bookingForm.personal.surname" @change="checkFirstTraveller"
                            ref='bookingForm.personal.surname' class="form-control"
                            :class="{ 'border-danger': v$.bookingForm.personal.surname.$errors.length }" type="text"
                            :placeholder="$t('user.profile.surname.placeholder')
                              " />
                          <div class="text-danger font-size-14" v-for="error of v$.bookingForm.personal.surname.$errors"
                            :key="error.$uid">
                            <div class="error-msg">* {{ $t(error.$propertyPath) }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- end col-lg-6 -->
                    <div class="col-lg-6 responsive-column">
                      <div class="input-box">
                        <label class="label-text">{{
                          $t("user.profile.mail")
                        }}</label>
                        <div class="form-group">
                          <span class="la la-envelope-o form-icon"></span>
                          <input v-model="bookingForm.personal.email" ref='bookingForm.personal.email'
                            class="form-control"
                            :class="{ 'border-danger': v$.bookingForm.personal.email.$errors.length }" type="email"
                            :placeholder="$t('user.profile.mail.placeholder')" />
                          <div class="text-danger font-size-14" v-for="error of v$.bookingForm.personal.email.$errors"
                            :key="error.$uid">
                            <div class="error-msg">* {{ $t(error.$propertyPath) }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- end col-lg-6 -->
                    <div class="col-lg-6 responsive-column">
                      <div class="input-box">
                        <label class="label-text">{{
                          $t("user.profile.phone")
                        }}</label>
                        <div class="form-group">
                          <span class="la la-phone form-icon"></span>
                          <input v-model="bookingForm.personal.phone" ref='bookingForm.personal.phone'
                            class="form-control"
                            :class="{ 'border-danger': v$.bookingForm.personal.phone.$errors.length }" type="text"
                            :placeholder="$t('user.profile.phone.placeholder')" />
                          <div class="text-danger font-size-14" v-for="error of v$.bookingForm.personal.phone.$errors"
                            :key="error.$uid">
                            <div class="error-msg">* {{ $t(error.$propertyPath) }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- end col-lg-6 -->
                    <div class="col-lg-12">
                      <div class="input-box">
                        <label class="label-text">{{
                          $t("user.profile.address")
                        }}</label>
                        <div class="form-group">
                          <span class="la la-map-marked form-icon"></span>
                          <input v-model="bookingForm.personal.address" ref='bookingForm.personal.address'
                            class="form-control"
                            :class="{ 'border-danger': v$.bookingForm.personal.address.$errors.length }" type="text"
                            :placeholder="$t('user.profile.address.placeholder')
                              " />
                          <div class="text-danger font-size-14" v-for="error of v$.bookingForm.personal.address.$errors"
                            :key="error.$uid">
                            <div class="error-msg">* {{ $t(error.$propertyPath) }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-6 col-lg-3">
                      <div class="input-box">
                        <label class="label-text">{{
                          $t("user.profile.state")
                        }}</label>
                        <input type="text" ref='bookingForm.personal.state'
                          :class="{ 'border-danger': v$.bookingForm.personal.state.$errors.length }"
                          v-model="bookingForm.personal.state" class="ps-3 form-control" />
                        <div class="text-danger font-size-14" v-for="error of v$.bookingForm.personal.state.$errors"
                          :key="error.$uid">
                          <div class="error-msg">* {{ $t(error.$propertyPath) }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-6 col-lg-3">
                      <div class="input-box">
                        <label class="label-text">{{
                          $t("user.profile.city")
                        }}</label>
                        <input type="text" ref='bookingForm.personal.city'
                          :class="{ 'border-danger': v$.bookingForm.personal.city.$errors.length }"
                          v-model="bookingForm.personal.city" class="ps-3 form-control" />
                        <div class="text-danger font-size-14" v-for="error of v$.bookingForm.personal.city.$errors"
                          :key="error.$uid">
                          <div class="error-msg">* {{ $t(error.$propertyPath) }}</div>
                        </div>
                      </div>
                    </div>
                    <!-- end col-lg-12 -->
                    <div class="col-lg-6 responsive-column">
                      <div class="input-box">
                        <label class="label-text">{{
                          $t("user.profile.region")
                        }}</label>
                        <select :class="{ 'border-danger': v$.bookingForm.personal.country.$errors.length }"
                          class="form-control form-select ps-3" v-model="bookingForm.personal.country">
                          <option v-for="(country, index) in source.countries" :key="index" :value="country.iso2"> {{
                            country.name_de }}</option>
                        </select>
                        <div class="text-danger font-size-14" v-for="error of v$.bookingForm.personal.country.$errors"
                          :key="error.$uid">
                          <div class="error-msg">* {{ $t(error.$propertyPath) }}</div>
                        </div>
                      </div>
                    </div>
                    <!-- end col-lg-6 -->

                    <!-- end col-lg-6 -->
                  </div>
                </form>
              </div>
              <!-- end contact-form-action -->
            </div>
            <!-- end form-content -->
          </div>
          <div class="form-box">
            <div class="form-title-wrap py-3">
              <h3 class="title text-color-6 font-weight-bold">
                {{ $t("search.traveller") }}
              </h3>
            </div>
            <!-- form-title-wrap -->

            <div class="form-content" v-if="search && bookingForm.traveller.length > 0">
              <div class="contact-form-action">
                <div class="form-group d-flex">
                  <input id="traveller_first" class="me-2 mt-2 " type="checkbox" :true-value="1" :false-value="0"
                    v-model="bookingForm.traveller_first" />
                  <label for="traveller_first"> {{ $t('booking.traveller.mine') }}</label>
                </div>
                <div v-for="(traveller, index) in bookingForm.traveller" :key="index" class="mb-2">
                  <span class="font-weight-bold ">{{ index + 1 }}.{{ $t("search.adult") }}</span>
                  <div class="row mt-2">
                    <div class="col-lg-2 responsive-column">
                      <div class="input-box">
                        <label class="label-text">{{
                          $t("user.profile.gender")
                        }}</label>
                        <div class="form-group">
                          <select v-model="traveller.gender" class="form-control form-select ps-3" :class="{
                            'border-danger border-2':
                              v$.bookingForm.traveller.$errors[0]?.$response
                                .$data[index].gender.$error,
                          }" :placeholder="$t('user.profile.surname.placeholder')
                            " :ref="`bookingForm.traveller[${index}].gender`">
                            <option value="1">Herr</option>
                            <option value="2">Frau</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-3 responsive-column">
                      <div class="input-box">
                        <label class="label-text">{{
                          $t("user.profile.name")
                        }}</label>
                        <div class="form-group">
                          <span class="la la-user form-icon"></span>
                          <input v-model="traveller.name" :placeholder="$t('user.profile.name')" class="form-control"
                            :class="{
                              'border-danger border-2':
                                v$.bookingForm.traveller.$errors[0]?.$response
                                  .$data[index].name.$error,
                            }" type="text" :ref="`bookingForm.traveller[${index}].name`" />
                        </div>
                      </div>
                    </div>
                    <!-- end col-lg-6 -->
                    <div class="col-lg-3 responsive-column">
                      <div class="input-box">
                        <label class="label-text">{{
                          $t("user.profile.surname")
                        }}</label>
                        <div class="form-group">
                          <span class="la la-user form-icon"></span>
                          <input v-model="traveller.surname" class="form-control"
                            :placeholder="$t('user.profile.surname')" :class="{
                              'border-danger border-2':
                                v$.bookingForm.traveller.$errors[0]?.$response
                                  .$data[index].surname.$error,
                            }" type="text" :ref="`bookingForm.traveller[${index}].surname`" />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 responsive-column">
                      <label class="label-text">{{
                        $t("user.profile.birthday")
                      }}</label>
                      <FormBirthday @input-val="(e) => (traveller.birthday = e)" :value="''"
                        :item_id="'traveller' + index + '_birthday'" :max="index === 0 ? 18 : 0"
                        :checkoutclicked="checkout_clicked" />
                    </div>
                  </div>
                </div>
                <div v-for="(child, i) in bookingForm.children" :key="i" class="mb-2">
                  <span class="font-weight-bold ">{{ i + 1 }}.{{ $t("search.children") }}</span>
                  <div class="row mt-2">
                    <div class="col-lg-2 responsive-column">
                      <div class="input-box">
                        <label class="label-text">{{
                          $t("user.profile.gender")
                        }}</label>
                        <div class="form-group">
                          <select v-model="child.gender" class="form-control form-select ps-3" :class="{
                            'border-danger border-2':
                              v$.bookingForm.children.$errors[0]?.$response
                                .$data[i].gender.$error,
                          }" :placeholder="$t('user.profile.surname.placeholder')
                            " :ref="`bookingForm.children[${i}].gender`">
                            <option value="1">Herr</option>
                            <option value="2">Frau</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-3 responsive-column">
                      <div class="input-box">
                        <label class="label-text">{{
                          $t("user.profile.name")
                        }}</label>
                        <div class="form-group">
                          <span class="la la-user form-icon"></span>
                          <input v-model="child.name" class="form-control" :placeholder="$t('user.profile.name')"
                            :class="{
                              'border-danger border-2':
                                v$.bookingForm.children.$errors[0]?.$response
                                  .$data[i].name.$error,
                            }" type="text" :ref="`bookingForm.children[${i}].name`" />
                        </div>
                      </div>
                    </div>
                    <!-- end col-lg-6 -->
                    <div class="col-lg-3 responsive-column">
                      <div class="input-box">
                        <label class="label-text">{{
                          $t("user.profile.surname")
                        }}</label>
                        <div class="form-group">
                          <span class="la la-user form-icon"></span>
                          <input v-model="child.surname" class="form-control" :placeholder="$t('user.profile.surname')"
                            :class="{
                              'border-danger border-2':
                                v$.bookingForm.children.$errors[0]?.$response
                                  .$data[i].surname.$error,
                            }" type="text" :ref="`bookingForm.children[${i}].surname`" />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 responsive-column">
                      <label class="label-text">{{
                        $t("user.profile.birthday")
                      }}</label>

                      <FormBirthday @input-val="(e) => (child.birthday = e)" :value="''" :children="true"
                        :item_id="'children' + i + '_birthday'" :checkoutclicked="checkout_clicked" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12 responsive-column">
                    <div class="input-box">
                      <label class="label-text">{{ $t("bookingForm.comment") }}</label>
                      <div class="form-group">
                        <span class="la la-comment form-icon"></span>
                        <textarea v-model="bookingForm.comment" ref="bookingForm.comment" class="form-control"
                          type="text" :placeholder="$t('bookingForm.comment')"></textarea>
                        <!-- <div class="text-danger font-size-14" v-for="error of v$.bookingForm.personal.name.$errors" :key="error.$uid">
                            <div class="error-msg">*  {{  $t(error.$propertyPath) }}</div>
                          </div> -->
                      </div>
                    </div>
                  </div>
                  <!-- end col-lg-6 -->
                  <!-- end col-lg-6 -->
                </div>
              </div>
              <!-- end contact-form-action -->
            </div>
            <!-- end form-content -->
          </div>
          <!-- end form-box -->
          <div class="form-box">
            <div class="form-title-wrap py-3">
              <h3 class="title text-color-6 font-weight-bold">
                {{ $t("offer.payment.title") }}
              </h3>
            </div>
            <!-- form-title-wrap -->
            <div class="form-content">
              <div class="section-tab check-mark-tab text-center pb-4">
                <ul class="nav nav-tabs justify-content-center row" id="myTab" role="tablist">
                  <li class="col-12 col-lg-3 mb-2">
                    <a :class="{ 'active': bookingForm.payment.method == 1 }" @click="bookingForm.payment.method = 1"
                      class="nav-link " id="payoneer-tab" data-toggle="tab" href="#payoneer" role="tab"
                      aria-controls="payoneer" aria-selected="true">
                      <i class="la la-check icon-element"></i>
                      <img width="32" src="~assets/images/bank-transfer.png" alt="" />
                      <span class="d-block pt-2">{{
                        $t("offer.payment.offline")
                      }}</span>
                    </a>
                  </li>
                  <li class="col-12 col-lg-3">
                    <a class="nav-link" :class="{ 'active': bookingForm.payment.method == 4 }"
                      @click="bookingForm.payment.method = 4" id="branch-tab" data-toggle="tab" href="#branch"
                      role="tab" aria-controls="paypal" aria-selected="true">
                      <i class="la la-check icon-element"></i>
                      <img width="32" src="~assets/images/buspay.png" alt="" />
                      <span class="d-block pt-2">{{
                        $t("offer.payment.bus_payment")
                      }}</span>
                    </a>
                  </li>
                  <!-- Saferpay/SixPayment <li class="col-12 col-lg-3 mb-2">
                    <a class="nav-link" :class="{ 'active': bookingForm.payment.method == 3 }"
                      @click="bookingForm.payment.method = 3" id="credit-card-tab" data-toggle="tab" href="#credit-card"
                      role="tab" aria-controls="credit-card" aria-selected="false">
                      <i class="la la-check icon-element"></i>
                      <img src="~assets/images/payment-img.png" alt="" />
                      <span class="d-block pt-2">{{ $t("offer.payment.creditcart") }}
                      </span>
                    </a>
                  </li> -->
                  <li class="col-12 col-lg-3 mb-2">
                    <a class="nav-link" :class="{ 'active': bookingForm.payment.method == 5 }"
                      @click="bookingForm.payment.method = 5" id="credit-card-tab" data-toggle="tab" href="#credit-card"
                      role="tab" aria-controls="credit-card" aria-selected="false">
                      <i class="la la-check icon-element"></i>
                      <img src="~assets/images/payment-img.png" alt="" />
                      <span class="d-block pt-2">{{ $t("offer.payment.creditcart") }}
                      </span>
                    </a>
                  </li>
                  <li class="col-12 col-lg-3">
                    <a class="nav-link" :class="{ 'active': bookingForm.payment.method == 2 }"
                      @click="bookingForm.payment.method = 2" id="paypal-tab" data-toggle="tab" href="#paypal"
                      role="tab" aria-controls="paypal" aria-selected="true">
                      <i class="la la-check icon-element"></i>
                      <img width="64" src="~assets/images/klarna.png" alt="" />
                      <span class="d-block pt-2">{{
                        $t("offer.payment.onlinebanking")
                      }}</span>
                    </a>
                  </li>


                </ul>
              </div>
              <div class="my-4">
                <div class="font-size-12">
                  <span class="font-weight-bold ">* </span>{{ $t("offer.payment.creditcom") }}
                </div>
              </div>
              <!-- end section-tab -->

              <!-- end tab-content -->
            </div>

            <!-- end form-content -->
          </div>
          <div class="form-box">
            <div class="form-title-wrap py-3">
              <h3 class="title text-color-6 font-weight-bold">
                {{ $t("offer.conditions") }}
              </h3>
            </div>
            <!-- form-title-wrap -->
            <div class="form-content line-height-22">
              <div class="custom-checkbox">
                <input id="aggregment" ref='bookingForm.aggregment' type="checkbox" v-model="bookingForm.aggregment"
                  :true-value="1" :false-value="''">
                <label for="aggregment" class="font-size-12">
                  <div class="mb-2" v-html="$t('offer.condition1')"></div>
                  <p class="mb-2" v-html="$t('offer.condition2')"></p>
                  <p v-html="$t('offer.condition3')"></p>
                </label>
              </div>
              <div class="text-danger font-size-14" v-for="error of v$.bookingForm.aggregment.$errors"
                :key="error.$uid">
                <div class="error-msg">* {{ $t('booking.form.req.aggregment') }}</div>
              </div>
              <div class="custom-checkbox mt-4">
                <input id="tour_operator" type="checkbox" :true-value="1" :false-value="0">
                <label for="tour_operator" class="font-size-12">
                  <p class="mb-2" v-html="$t('offer.tourOperator.aggregment')"></p>
                </label>
              </div>
            </div>
          </div>
          <div class="form-box p-3" v-if="offer">
            <div>
              <h3 class="title text-color-6 font-weight-bold mb-2 mt-2">
                {{ $t("offer.is_available") }}
              </h3>
              <div>
                <div> {{ offer.travellerList.length }} {{ $t('search.adult') }} </div>
              </div>
              <hr>
              <div class="d-flex justify-content-between mt-3">
                <div> <span class="title">{{ $t('offer.amount') }}</span> <br> <small> {{ $t('offer.amount_text')
                }}</small></div>
                <div class="font-weight-bold font-size-24">{{ $n(offer.totalPrice.label) }} EUR</div>
              </div>
            </div>

          </div>
          <!-- end form-box -->
          <button @click="checkout" :disabled="saving"
            class="btn theme-btn theme-btn-orange font-size-18 px-5 float-end font-weight-bold">
            <i class="la la-spinner" v-if="saving"></i>
            {{ $t("offer.complete") }}
          </button>
        </div>
        <!-- end col-lg-8 -->
        <div class="col-lg-4 col-12 " v-if="tour">
          <div class="w-100 booking-detail-form form-box d-none d-lg-block">
            <div class="form-title-wrap py-3">
              <h3 class="title text-color-6 font-weight-bold">
                {{ $t("booking.title") }}
              </h3>
            </div>
            <!-- end form-title-wrap -->
            <TourSummary :tour="tour" :search="search" v-if="tour" />
            <!-- end form-content -->
          </div>
          <div class="form-box p-3 position-sticky d-none d-lg-block" style="top:20px" v-if="offer">
            <div>
              <h3 class="title text-color-6 font-weight-bold mb-2 mt-2">
                {{ $t("offer.is_available") }}
              </h3>
              <div>
                <div> {{ offer.travellerList.length }} {{ $t('search.adult') }} </div>
              </div>
              <hr>
              <div class="d-flex justify-content-between mt-3">
                <div> <span class="title">{{ $t('offer.amount') }}</span> <br> <small> {{ $t('offer.amount_text')
                }}</small></div>
                <div class="font-weight-bold font-size-24">{{ $n(offer.totalPrice.label) }} EUR</div>
              </div>
            </div>

          </div>

          <!-- end form-box -->
        </div>

        <!-- end col-lg-4 -->
      </div>
      <!-- end row -->
    </div>
    <div class="offcanvas offcanvas-end" id="summary-modal">
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">{{ $t("booking.title") }}</h5>
        <a type="button" class="btn" data-bs-dismiss="offcanvas" aria-label="Close"><i class="la la-close"></i></a>
      </div>
      <div class="offcanvas-body">
        <TourSummary :search="search" :tour="tour" v-if="tour" />
        <LoaderSummary v-if="loader" />
        <div class="offcanvas-footer">
          <a class="btn theme-btn theme-btn-orange w-50 line-height-28" data-bs-dismiss="offcanvas"
            aria-label="Close">OK</a>
        </div>
      </div>
    </div>

    <div class="modal fade" id="error-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Error</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            {{ $t('booking.unknown_error') }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="closeError()">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- end container -->
  </section>
  <!-- end booking-area -->
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, email } from "@vuelidate/validators";

export default {
  data() {
    return {
      checkout_clicked: false,
      saving: false,
      source: {
        countries: [],
      },
      offer: null,
      is_available: true,
      error_message: '',
      loader: true,
      tour: null,
      step: [],
      search: null,
      bookingForm: {
        tour_id: '',
        personal: {
          name: '',
          surname: '',
          email: '',
          phone: '',
          address: '',
          state: '',
          city: '',
          country: 'AT',
        },
        traveller: [{ name: "", surname: "", birthday: "", gender: "" }],
        children: [{ name: "", surname: "", birthday: "", gender: "" }],
        booking: {},
        payment: {
          method: 1
        },
        comment: '',
        coupon: '',
        aggregment: '',
        traveller_first: 1,
      },
    };
  },
  watch: {
    'bookingForm.traveller_first': {
      handler: function (a, b) {
        this.checkFirstTraveller();
      }, deep: true
    },
  },
  validations() {
    const mustBeDate = helpers.regex(
      /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
    );
    const phoneNumber = helpers.regex(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    )
    return {
      bookingForm: {
        personal: {
          name: { required },
          surname: { required },
          email: { required, email },
          phone: { required, phoneNumber },
          address: { required },
          state: { required },
          city: { required },
          country: { required },
        },
        traveller: {
          $each: helpers.forEach({
            gender: { required },
            name: { required },
            surname: { required },
            birthday: { required, mustBeDate },
          }),
        },
        children: {
          $each: helpers.forEach({
            gender: { required },
            name: { required },
            surname: { required },
            birthday: { required, mustBeDate },
          }),
        },
        aggregment: { required },
      },
    };
  },

  methods: {

    getCountries() {
      $fetch(`/api/region/country?limit=255`).then(
        (res) => {
          this.source.countries = res.data;
        }
      );
    },

    getOffer() {

      let self = this;
      $fetch("/api/booking/tour/tour/fetch/" + this.search.tour_id).then(function (result) {
        if (!result.status) {
          return false;
        }
        self.tour = result.data;
        self.getBookingParams();
        self.step.push({ name: self.$t('tour.breadcrumb'), to: '/tour' });
        self.step.push(self.getCrumbObject(self.tour, "tour"));
        self.step.push({ name: "Bestätigung" });
      }).finally(() => {
        self.loader = false;
      });

    },

    getBookingParams: function () {
      var _this = this;
      /*this.bookingForm.personal = this.bookingForm.personal || {};
      this.bookingForm.personal.name = Marti.Member.name;
      this.bookingForm.personal.surname = Marti.Member.surname;
      this.bookingForm.personal.email = Marti.Member.username;
      this.bookingForm.personal.gender = 0;*/

      this.bookingForm.traveller = [];
      for (var i = 0; i < parseInt(this.search.adults); i++) {
        this.bookingForm.traveller.push({
          gender: "",
          name: "",
          surname: "",
          birthday: "",
        });
      }
      this.bookingForm.children = [];
      for (var i = 0; i < parseInt(this.search.children); i++) {
        this.bookingForm.children.push({
          gender: "",
          name: "",
          surname: "",
          birthday: "",
        });
      }
    },

    checkFirstTraveller() {
      if (this.bookingForm.traveller_first === 1) {
        this.bookingForm.traveller[0].name = this.bookingForm.personal.name;
        this.bookingForm.traveller[0].surname =
          this.bookingForm.personal.surname;
        this.bookingForm.traveller[0].gender = this.bookingForm.personal.gender;
      }
    },


    openError() {
      setTimeout(function () {
        var modal = new bootstrap.Modal(document.getElementById('error-modal'));
        modal.show();
      }, 500);

    },

    closeError() {
      window.location.href = '/';
    },

    scrollToElement() {
      let err = this.v$.$errors[0];
      let path = err.$propertyPath;
      let el = this.$refs[path];
      if (err.$validator === "$each") {
        err.$response.$errors.find((item, index) => {
          let objProps = Object.getOwnPropertyNames(item);
          return objProps.find((key) => {
            if (item[key].length > 0) {
              path += `[${index}].${item[key][0].$property}`;
              el = this.$refs[path][0];
              return true;
            }
          });
        });
      }
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    getCrumbObject(tourObj, crumbType) {
      switch (crumbType) {
        case "tour":
          return {
            name: tourObj.title,
            to: `/tour/${tourObj.seo_url}?tid=${tourObj.id}`
          };
      }
    },
    async checkout() {
      this.checkout_clicked = false; //dont remove this line.
      setTimeout(() => {
        this.checkout_clicked = true;
      }, 50);
      const isFormCorrect = await this.v$.$validate()

      if (!isFormCorrect) {
        this.scrollToElement();
        return

      };

      this.saving = true;
      this.search.child_count = this.search.children;
      delete this.search.children;
      $fetch("/api/engine/tour/create", { method: 'POST', body: { ...this.bookingForm, ...this.search } }).then(function (result) {

        if (!result.status) {
          this.saving = false;
          return false;
        } else {
          if (result.data && result.data.url) {
            location.href = result.data.url
          } else {
            location.href = '/tour/complete?booking=' + result.data.id;
          }
        }
      }).finally(() => {
        this.saving = false;
      })

    },

  },
  mounted() {
    let obj = this.$route.query.opts;
    if (!obj) {
      return false;
    }
    this.search = JSON.parse(obj);
    this.getOffer();
    this.getCountries();
  },
  setup: () => ({ v$: useVuelidate() }),
};
</script>
