<template>
    <div class="offcanvas offcanvas-end" id="duration-modal">
        <div class="offcanvas-header">
            <h5 id="offcanvasRightLabel">{{ $t('search.duration') }}</h5>
            <a class="btn" data-bs-dismiss="offcanvas" aria-label="Close"><i class="la la-close"></i></a>
        </div>
        <div class="offcanvas-body">
            <div class="">
                <div class="">
                    <div class="row">
                        <div class="col-4" v-for="(option, index) in options" :key="index">
                            <a :class="{ 'theme-btn-orange': duration == option.value }" @click="select(option.value)"
                                class="btn font-size-14 w-100 mb-2 rounded border border-success">
                                {{ option.label }}
                            </a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="text-center mt-2">{{ duration }} {{ $t('common.days') }}</div>
                            <input type="range" min="1" max="28" v-model="duration" class="form-range">
                        </div>
                    </div>
                   
                </div>
            </div>
            <div class="offcanvas-footer ">
                    <a
                    class="btn btn-light"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                >{{ $t('user.cancel')}}</a>
                <a
                    class="btn theme-btn theme-btn-orange line-height-28 "
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    @click="select()"
                >{{ $t('search.filter_accept')}}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['modelValue'],
    data() {
        return {
            duration: 7,
            options: [
                { label: "7 Tage", value: 7 },
                { label: "14 Tage", value: 14 },
                { label: "1-4 Tage", value: 1 },
                { label: "5-8 Tage", value: 5 },
                { label: "9-12 Tage", value: 9 },
                { label: "Beliebig", value: 0 },
            ],
        };
    },
    watch : {
        duration(){
            this.$emit('update:modelValue', this.duration);
        }
    },
    methods: {
        select(duration) {
            this.duration = duration || this.duration;
            this.$emit('update:modelValue', this.duration);
        },
        closeDropdown() {
            let dropdown = new bootstrap.Dropdown('#duration-dropdown');
            dropdown.hide();
        }
    },
    mounted() {
        this.duration  = this.modelValue;
    }
};
</script>
