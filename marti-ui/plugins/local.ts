import { createI18n } from 'vue-i18n'

import de from '../locales/de.json'
import tr from '../locales/tr.json'

export default defineNuxtPlugin((nuxtApp) => {
    
    const cookie = useCookie('store-language') || 'de';
    const route = useRoute();
    let path = route.path.replace('/', '');
    if (['de', 'tr', 'en'].indexOf(path) > - 1) {
        cookie.value = path;
    }

    const localizer = createI18n({
        legacy: false,
        globalInjection: true,
        locale: cookie.value || 'de',
        warnHtmlMessage: false,
        fallbackLocale: 'de',
        messages: {
            tr,
            de
        }
    })
    nuxtApp.vueApp.use(localizer)

    return{
        provide:{
           rtl : cookie.value == 'ar',
           language : cookie.value,
           n: (number) => {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          },
        }
    }
})