
require('./bootstrap');

window.Vue = require('vue');

Vue.component('example-component', require('./components/ExampleComponent.vue').default);


const app = new Vue({
    el: '#app',
    data: {
		titulo: ''

	},

	methods:{
		agregar(){
			//axios.get('/getbanco', {params: {id: this.titulo} }).then((response) => {
				console.log(response.data);
			//});
			
		}
	}
});
