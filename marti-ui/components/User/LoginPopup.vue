<template>
<div>

  <div class="offcanvas offcanvas-end" id="login-modal">
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">{{ $t('user.login')}} </h5>
      <a
        type="button"
        class="btn"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
        ><i class="la la-close"></i
      ></a>
    </div>
    <div class="offcanvas-body">
        <div class="contact-form-action py-5 px-3">
            <form method="post">
                <div class="input-box">
                    <label class="label-text">{{ $t('user.email')}}</label>
                    <div class="form-group">
                        <span class="la la-user form-icon"></span>
                        <input class="form-control" type="text" name="text" >
                    </div>
                </div>
                <div class="input-box">
                    <label class="label-text">{{ $t('user.password')}}</label>
                    <div class="form-group mb-2">
                        <span class="la la-lock form-icon"></span>
                        <input class="form-control" type="text" name="text" >
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                       
                        <p class="forgot-password">
                            <a >{{ $t('user.forget_password')}}</a>
                        </p>
                    </div>
                </div>
                <div class="btn-box pt-3 pb-4">
                    <button type="button" class="btn theme-btn-orange w-100">{{ $t('user.login')}}</button>
                </div>
                <div class="action-box text-center">
                    <button class="btn w-100" data-bs-toggle="offcanvas" data-bs-target="#register-modal"> or {{ $t('user.register') }}</button>
                </div>
            </form>
        </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  props: [],
 
};
</script>
