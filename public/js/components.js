var data = {
    component_panel_upload : null,
    component_modal_upload : null,
    component_kyc_modal : null,
    component_kyc_panel : null,
    component_level_panel : null,
    component_kyc_upload : null
}

Vue.config.silent = false;
Vue.config.devtools = true

var app = new Vue({
  el: '#app',
  data : data,
  mounted(){
    window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    let token = document.head.querySelector('meta[name="csrf-token"]');
      if (token) {
         window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
      } else {
        console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
      }
  }
});
