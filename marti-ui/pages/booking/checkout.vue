<template>
  <!-- <BreadCrumbSmall title="Hotel Detay" :step="step" v-if="offer" /> -->
  <BreadCrumbNew :step="step_new" v-if="hotel" />
  <section class="booking-area padding-top-20px padding-bottom-70px">
    <div class="container">
      <button type="button" data-bs-toggle="offcanvas" data-bs-target="#summary-modal"
        class="btn btn-light w-100 rounded-0 my-2 d-block d-lg-none">
        <i class="la la-info-circle"></i> {{ $t("booking.title") }}
      </button>

      <div class="row">
        <div class="col-lg-12" v-if="!offer && is_available">
          <div class="
              d-flex
              align-items-center
              justify-content-center
              form-box
              p-3
            " style="min-height: 500px">
            <div class="me-4">
              <div class="marti-loader"></div>
            </div>
            <div class="ms-4">
              <h4>{{ $t("common.loading") }}...</h4>
              <p>{{ $t("common.loading_spinner") }}</p>
            </div>
          </div>
        </div>
        <div class="col-lg-12" v-if="!offer && is_available == false">
          <div class="
              d-flex
              align-items-center
              justify-content-center
              form-box
              p-3
            " style="min-height: 500px">
            <div class="mx-4">
              <img src="~assets/images/warning.png" />
            </div>
            <div class="ms-4">
              <p class="font-size-16">{{ $t("offer.hotel_error") }}...</p>
              <p>
                <a href="/" class="btn btn-light my-2"><i class="la la-angle-left"></i> Back</a>
              </p>
            </div>
          </div>
          <p><b>Toma:</b> {{ error_message }}</p>
        </div>
        <div class="col-lg-8" v-if="offer">
          <div class="form-box" v-if="v$.bookingForm">
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
                            ref="bookingForm.personal.name" class="form-control" :class="{
                              'border-danger border-2':
                                v$.bookingForm.personal.name.$errors.length,
                            }" type="text" :placeholder="$t('user.profile.name.placeholder')" />
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
                            ref="bookingForm.personal.surname" class="form-control" :class="{
                              'border-danger border-2':
                                v$.bookingForm.personal.surname.$errors.length,
                            }" type="text" :placeholder="$t('user.profile.surname.placeholder')
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
                          <input v-model="bookingForm.personal.email" ref="bookingForm.personal.email"
                            class="form-control" :class="{
                              'border-danger border-2':
                                v$.bookingForm.personal.email.$errors.length,
                            }" type="email" :placeholder="$t('user.profile.mail.placeholder')" />
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
                          <input v-model="bookingForm.personal.phone" ref="bookingForm.personal.phone"
                            class="form-control" :class="{
                              'border-danger border-2':
                                v$.bookingForm.personal.phone.$errors.length,
                            }" type="text" :placeholder="$t('user.profile.phone.placeholder')" />
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
                          <input v-model="bookingForm.personal.address" ref="bookingForm.personal.address"
                            class="form-control" :class="{
                              'border-danger border-2':
                                v$.bookingForm.personal.address.$errors.length,
                            }" type="text" :placeholder="$t('user.profile.address.placeholder')
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
                        <input type="text" ref="bookingForm.personal.state" :class="{
                          'border-danger border-2':
                            v$.bookingForm.personal.state.$errors.length,
                        }" v-model="bookingForm.personal.state" class="ps-3 form-control" />
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
                        <input type="text" ref="bookingForm.personal.city" :class="{
                          'border-danger border-2':
                            v$.bookingForm.personal.city.$errors.length,
                        }" v-model="bookingForm.personal.city" class="ps-3 form-control" />
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
                        <select :class="{
                          'border-danger':
                            v$.bookingForm.personal.country.$errors.length,
                        }" class="form-control form-select ps-3" v-model="bookingForm.personal.country">
                          <option v-for="(country, index) in source.countries" :key="index" :value="country.iso2">
                            {{ country.name_de }}
                          </option>
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
                  <input id="traveller_first" class="me-2 mt-2" type="checkbox" :true-value="1" :false-value="0"
                    v-model="bookingForm.traveller_first" />
                  <label for="traveller_first">
                    {{ $t("booking.traveller.mine") }}</label>
                </div>

                <div v-for="(traveller, index) in bookingForm.traveller" :key="index" class="mb-2">
                  <span class="font-weight-bold">{{ index + 1 }}.{{ $t("search.adult") }}</span>
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
                            <option value="1">{{ $t("common.male") }}</option>
                            <option value="2">{{ $t("common.female") }}</option>
                          </select>
                          <div class="text-danger font-size-10"
                            v-for="error of v$.bookingForm.traveller.$errors[0]?.$response.$errors[index].gender"
                            :key="error.$uid">
                            <div class="error-msg">* {{ $t(v$.bookingForm.traveller.$path + '_' + error.$property + '_'
                              + error.$validator) }}</div>
                          </div>
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
                          <div class="text-danger font-size-10"
                            v-for="error of v$.bookingForm.traveller.$errors[0]?.$response.$errors[index].name"
                            :key="error.$uid">
                            <div class="error-msg">* {{ $t(v$.bookingForm.traveller.$path + '_' + error.$property + '_'
                              + error.$validator) }}</div>
                          </div>
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
                          <div class="text-danger font-size-10"
                            v-for="error of v$.bookingForm.traveller.$errors[0]?.$response.$errors[index].surname"
                            :key="error.$uid">
                            <div class="error-msg">* {{ $t(v$.bookingForm.traveller.$path + '_' + error.$property + '_'
                              + error.$validator) }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 responsive-column">
                      <label class="label-text" :ref="`bookingForm.traveller[${index}].birthday`">{{
                        $t("user.profile.birthday") }}</label>
                      <FormBirthday @input-val="(e) => (traveller.birthday = e)" :value="''"
                        :item_id="'traveller' + index + '_birthday'" :max="index === 0 ? 18 : 0"
                        :checkoutclicked="checkout_clicked" />
                      <div class="text-danger font-size-10"
                        v-for="error of v$.bookingForm.traveller.$errors[0]?.$response.$errors[index].birthday"
                        :key="error.$uid">
                        <div class="error-msg">* {{ $t(v$.bookingForm.traveller.$path + '_' + error.$property + '_' +
                          error.$validator) }}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-for="(child, i) in bookingForm.children" :key="i" class="mb-2">
                  <span class="font-weight-bold">{{ i + 1 }}.{{ $t("search.children") }}</span>
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
                      <label class="label-text" :ref="`bookingForm.children[${i}].birthday`">{{
                        $t("user.profile.birthday") }}</label>
                      <FormBirthday @input-val="(e) => (child.birthday = e)" :value="''" :children="true"
                        :item_id="'children' + i + '_birthday'" :checkoutclicked="checkout_clicked" />
                      <div class="text-danger font-size-10"
                        v-for="error of v$.bookingForm.children.$errors[0]?.$response.$errors[i].birthday"
                        :key="error.$uid">
                        <div class="error-msg">* {{ $t(v$.bookingForm.children.$path + '_' + error.$property + '_' +
                          error.$validator) }}</div>
                      </div>
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
                        <!-- <div class="text-danger font-size-14" v-for="error of v$.bookingForm.personal.name.$errors"
                          :key="error.$uid">
                          <div class="error-msg">* {{ $t(error.$propertyPath) }}</div>
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
                  <li class="col-12 col-lg-4 mb-2">
                    <a :class="{ active: bookingForm.payment.method == 1 }" @click="bookingForm.payment.method = 1"
                      class="nav-link" id="payoneer-tab" data-toggle="tab" href="#payoneer" role="tab"
                      aria-controls="payoneer" aria-selected="true">
                      <i class="la la-check icon-element"></i>
                      <img width="32" src="~assets/images/bank-transfer.png" alt="" />
                      <span class="d-block pt-2">{{
                        $t("offer.payment.offline")
                      }}</span>
                    </a>
                  </li>
                  <!-- Saferpay/SixPayment<li class="col-12 col-lg-4 mb-2">
                    <a class="nav-link" :class="{ active: bookingForm.payment.method == 3 }"
                      @click="bookingForm.payment.method = 3" id="credit-card-tab" data-toggle="tab" href="#credit-card"
                      role="tab" aria-controls="credit-card" aria-selected="false">
                      <i class="la la-check icon-element"></i>
                      <img src="~assets/images/payment-img.png" alt="" />
                      <span class="d-block pt-2">{{ $t("offer.payment.creditcart") }}
                      </span>
                    </a>
                  </li> -->
                  <li class="col-12 col-lg-4 mb-2">
                    <a class="nav-link" :class="{ active: bookingForm.payment.method == 5 }"
                      @click="bookingForm.payment.method = 5" id="credit-card-tab" data-toggle="tab" href="#credit-card"
                      role="tab" aria-controls="credit-card" aria-selected="false">
                      <i class="la la-check icon-element"></i>
                      <img src="~assets/images/payment-img.png" alt="" />
                      <span class="d-block pt-2">{{ $t("offer.payment.creditcart") }}
                      </span>
                    </a>
                  </li>
                  <li class="col-12 col-lg-4">
                    <a class="nav-link" :class="{ active: bookingForm.payment.method == 2 }"
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
                  <span class="font-weight-bold">* </span>{{ $t("offer.payment.creditcom") }}
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
                <input id="aggregment" ref="bookingForm.aggregment" type="checkbox" v-model="bookingForm.aggregment"
                  :true-value="1" :false-value="''" />
                <label for="aggregment" class="font-size-12">
                  <div class="mb-2" v-html="$t('offer.condition1', {
                    url: offer.commonOffer.hotelOffer.hotel.tourOperator
                      .agb,
                  })"></div>
                  <p class="mb-2">{{ $t("offer.condition2") }}</p>
                  <p>{{ $t("offer.condition3") }}</p>
                </label>
              </div>
              <div class="text-danger font-size-14" v-for="error of v$.bookingForm.aggregment.$errors"
                :key="error.$uid">
                <div class="error-msg">
                  * {{ $t("booking.form.req.aggregment") }}
                </div>
              </div>


            </div>
          </div>
          <div class="form-box p-3" v-if="offer">
            <div>
              <h3 class="title text-color-6 font-weight-bold mb-2 mt-2">
                {{ $t("offer.is_available") }}
              </h3>
              <div>
                <div class="font-weight-bold" v-if="offer.travellerList.length > 1">
                  {{ offer.travellerList.length }} {{ $t("search.adults") }}
                </div>
                <div class="font-weight-bold" v-else>
                  {{ offer.travellerList.length }} {{ $t("search.adult") }}
                </div>
                <PriceDetail :total_price="offer.totalPrice" :price_per_person="offer.pricePerPerson"
                  :price_per_person_diff="offer.pricePerPersonDifference" :traveller_list="offer.travellerList" />
              </div>

              <hr />
              <div class="d-flex justify-content-between mt-3">
                <div>
                  <span class="title">{{ $t("offer.amount") }}</span> <br />
                  <small> {{ $t("offer.amount_text") }}</small>
                </div>
                <div class="font-weight-bold font-size-24">
                  {{ $n(offer.totalPrice.label) }} EUR
                </div>
              </div>
            </div>
          </div>
          <!-- end form-box -->
          <button @click="checkout" :disabled="saving" class="
              btn
              theme-btn theme-btn-orange
              font-size-18
              px-5
              float-end
              font-weight-bold
            ">
            <i class="la la-spinner" v-if="saving"></i>
            {{ $t("offer.complete") }}
          </button>
        </div>
        <!-- end col-lg-8 -->
        <div class="col-lg-4 col-12" v-if="offer">
          <div class="w-100 booking-detail-form form-box d-none d-lg-block">
            <div class="form-title-wrap py-3">
              <h3 class="title text-color-6 font-weight-bold">
                {{ $t("booking.title") }}
              </h3>
            </div>
            <!-- end form-title-wrap -->
            <HotelBookingSummary :offer="offer" :hotel="hotel_search" />
            <!-- end form-content -->
          </div>
          <div class="form-box p-3 position-sticky d-none d-lg-block" style="top: 20px" v-if="offer">
            <div>
              <h3 class="title text-color-6 font-weight-bold mb-2 mt-2">
                {{ $t("offer.is_available") }}
              </h3>
              <div>
                <div class="font-weight-bold" v-if="offer.travellerList.length > 1">
                  {{ offer.travellerList.length }} {{ $t("search.adults") }}
                </div>
                <div class="font-weight-bold" v-else>
                  {{ offer.travellerList.length }} {{ $t("search.adult") }}
                </div>

                <PriceDetail :total_price="offer.totalPrice" :price_per_person="offer.pricePerPerson"
                  :price_per_person_diff="offer.pricePerPersonDifference" :traveller_list="offer.travellerList" />
              </div>
              <hr />
              <div class="d-flex justify-content-between mt-3">
                <div>
                  <span class="title">{{ $t("offer.amount") }}</span> <br />
                  <small> {{ $t("offer.amount_text") }}</small>
                </div>
                <div class="font-weight-bold font-size-24">
                  {{ $n(offer.totalPrice.label) }} EUR
                </div>
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
        <HotelBookingSummary :offer="offer" :hotel="hotel_search" />
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
            {{ $t("booking.unknown_error") }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="closeError()">
              Close
            </button>
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
      error_message: "",
      loader: true,
      hotel: {},
      hotel_search: {},
      step: [],
      step_new: [],
      search: null,
      bookingForm: {
        personal: {
          name: "",
          surname: "",
          email: "",
          phone: "",
          address: "",
          state: "",
          city: "",
          country: "AT",
        },
        traveller: [{ name: "", surname: "", birthday: "", gender: "" }],
        children: [{ name: "", surname: "", birthday: "", gender: "" }],
        booking: {},
        payment: {
          method: 1,
        },
        comment: "",
        coupon: "",
        aggregment: "",
        traveller_first: 1,
      },
    };
  },
  watch: {
    "bookingForm.traveller_first": {
      handler: function (a, b) {
        this.checkFirstTraveller();
      },
      deep: true,
    },
  },
  validations() {
    const mustBeDate = helpers.regex(
      /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
    );
    const phoneNumber = helpers.regex(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{1,4})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
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
      $fetch(`/api/region/country?limit=255`).then((res) => {
        this.source.countries = res.data;
      });
    },
    formatPhoneNumber(phone) {
      let formattedPhone = phone.replace(/\s+/g, '');
      if (!formattedPhone.startsWith('+')) {
        if (formattedPhone.startsWith('0')) {
          formattedPhone = '0' + formattedPhone.replace(/^0+/, '');
        } else {
          formattedPhone = '0' + formattedPhone;
        }
      }
      return formattedPhone;
    },
    validatePhoneNumber() {
      const phone = this.bookingForm.personal.phone;
      const formattedPhone = this.formatPhoneNumber(phone);
      this.bookingForm.personal.phone = formattedPhone;
      const phonePattern = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{1,4})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
      if (!phonePattern.test(formattedPhone) && this.$v?.bookingForm) {
        this.$v.bookingForm.personal.phone.$error = true;
        return false;
      }
      return true;
    },

    getOffer() {
      //this.loader = true;
      let params = {
        code: this.$route.query.code,
        adults: this.search.adults,
        children: this.search.children,
      };

      if (!this.validatePhoneNumber()) {
        this.$v.bookingForm.personal.phone.$error = true;
        return false;
      }
      if (params.code == "") {
        return false;
      }

      $fetch(`/api/engine/offer/checkoffer`, {
        method: "POST",
        body: params,
      }).then((res) => {
        if (res.status == false) {
          this.is_available = false;
          this.error_message = res.message;
          return false;
        }
        this.loader = false;
        this.offer = res.data.response;
        //  this.hotel = this.offer.commonOffer.hotelOffer.hotel;
        // this.step.push(
        //   this.hotel.location.region.name,
        //   this.hotel.location.name,
        //   this.hotel.name
        // );
        this.getBookingParams();

        let vue = this;
        if (this.search.destination?.code)
          this.search['giataIdList'] = [this.search.destination.code];
        $fetch("/api/engine/hotel/get", { method: 'POST', body: { ...this.search } }).then(function (result) {
          try {
            if (result.status && result.code == '200') {
              vue.hotel_search = result?.data?.response?.hotelList[0];
              vue.step.push("Bestätigung");
              vue.step_new.push(vue.getCrumbObject(vue.hotel_search, "region"));
              vue.step_new.push(vue.getCrumbObject(vue.hotel_search, "location"));
              vue.step_new.push(vue.getCrumbObject(vue.hotel_search, "hotel"));
              vue.step_new.push({ name: "Bestätigung" });
            }
          } catch (e) {

          }
        })

        // Facebook Pixel checkout
        try {
          this.$pixel.checkout({
            id: this.hotel.giata.hotelId,
            price: this.offer.commonOffer.totalPrice.value,
            currency: "EUR",
          });
        } catch (e) {

        }

        // Facebook Pixel checkout
        try {
          this.$dataLayer.checkout({
            name: this.hotel.giata.hotelName,
            id: this.hotel.giata.hotelId,
            price: this.offer.commonOffer.totalPrice.value,
            brand: this.offer.commonOffer.tourOperator.name,
            category: this.hotel.location.name,
            variant1: this.offer.commonOffer.hotelOffer.boardType.name,
            duration: this.offer.commonOffer.travelDate.duration,
            room_type: this.offer.commonOffer.hotelOffer.roomType.name,
            adult: this.bookingForm.traveller.length,
            children: this.bookingForm.children.length,
            departure_date: this.offer.commonOffer.travelDate.fromDate,
          });
        } catch (e) {

        }
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
      for (var i = 0; i < this.search.children.length; i++) {
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

    checkSearchData() {
      if (!this.$route.query.code) {
        return false;
      }

      let data = window.localStorage.getItem("m_" + this.$route.query.code);
      try {
        this.search = JSON.parse(data);
        this.search.adults = this.search.adults || 2;
        this.search.children = this.search.children || [];
        return true;
      } catch (e) {

      }

      return false;
    },

    openError() {
      setTimeout(function () {
        var modal = new bootstrap.Modal(document.getElementById("error-modal"));
        modal.show();
      }, 500);
    },

    closeError() {
      window.location.href = "/";
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

    async checkout() {
      this.checkout_clicked = false; //dont remove this line.
      setTimeout(() => {
        this.checkout_clicked = true;
      }, 50);

      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        this.scrollToElement();
        return;
      }

      this.saving = true;

      $fetch("/api/engine/booking/create", {
        method: "POST",
        body: { ...this.bookingForm, ...{ ref: this.$route.query.code } },
      })
        .then(function (result) {
          if (!result.status) {
            this.saving = false;
            return false;
          } else {
            if (result.data && result.data.url) {
              location.href = result.data.url;
            } else {
              location.href = "/booking/complete?booking=" + result.data.id;
            }
          }
        })
        .finally(() => {
          this.saving = false;
        });
    },
    getCrumbObject(hotelObj, crumbType) {
      let searchObj = this.search;
      let urlPrefix = "/search/hotels?";
      switch (crumbType) {
        case "region":
          searchObj.destination.code = hotelObj.location.region.code;
          searchObj.destination.type = crumbType;
          searchObj.destination.name = hotelObj.location.region.name;
          searchObj.giataIdList = [];
          break;
        case "location":
          searchObj.destination.code = hotelObj.location.code;
          searchObj.destination.type = crumbType;
          searchObj.destination.name = hotelObj.location.name;
          searchObj.giataIdList = [];
          break;
        case "hotel":
          searchObj.destination.code = hotelObj.giata.hotelId;
          searchObj.destination.type = crumbType;
          //urlPrefix = `/hotel/${hotelObj.name_sef}?f=`
          urlPrefix = `/hotel/${hotelObj.giata.hotelName}?`
          let searchStr = search.jsonToUrl(searchObj);
          //let searchStr = JSON.stringify(searchObj);
          return {
            name: hotelObj.giata.hotelName,
            to: urlPrefix + searchStr,
          };
      }
      //let searchStr = JSON.stringify(searchObj);
      let searchStr = search.jsonToUrl(searchObj);
      return {
        name: searchObj.destination.name,
        to: urlPrefix + searchStr,
      };
    },
  },
  mounted() {
    if (this.checkSearchData()) {
      this.getCountries();
      this.getOffer();
    } else {
      this.openError();
    }
  },
  setup: () => ({ v$: useVuelidate() }),
};
</script>
