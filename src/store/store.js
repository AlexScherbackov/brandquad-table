import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		people: [],
	},
	getters: {
		people: state => state.people
	},
	actions: {
		loadPeople(context){
			const SMALL_DATA_URL = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}';
		
			axios.get(SMALL_DATA_URL,{
				onDownloadProgress: function(progressEvent){
					
				}
			}).then(response => {
					context.commit('loadPeople', response.data);
				})
				.catch(error => {
					console.log(error);
				})
		}
	},
	mutations: {
		loadPeople(state, payload){
			state.people = payload;
		}
	}
})