import Vue from 'vue';
import VueI18n from 'vue-i18n';
import locale from 'element-ui/lib/locale'
Vue.use(VueI18n)

// import zh from './config/zh';
// import en from './config/en';

const i18n  = new VueI18n({
    locale : 'zh-CN',
    // locale:'en',
    messages:{
        'zh-CN':require('./config/zh'),
        'en-US':require('./config/en'),
    }

})

locale.i18n((key, value) => i18n.t(key, value)) // 把element 的语言包挂在到i18n中
export default i18n;