import { createStore } from 'vuex'
import axios from 'axios'
// Create a new store instance.
const store = createStore({
    state() {
        return {
            search: {
                query: '',
                result: {
                    center: { lat: 41.555352, lng: -87.686460 },
                    LocationImage: '',
                    formatted_address: '',
                    property:[],
                },
            }
        }
    },
    mutations: {
        setSearchQuery(state, query) {
            state.search.query = query
        },
        setSearchResult(state, result) {
            state.search.result.center = result.geometry.location
            if (result.photos) {
                state.search.result.LocationImage = result.photos[0].getUrl({
                    maxWidth: 200,
                    maxHeight: 200,
                });
            } else {
                state.search.result.LocationImage = 'https://static.thenounproject.com/png/1559121-200.png'
            }
            state.search.result.formatted_address = result.formatted_address
        },
        setProperty(state, property) {
            state.search.result.property = property
        }
    },
    getters: {
        getSearchQuery(state) {
            return state.search.query
        },
        getSearchResult(state) {
            return state.search.result
        },
        getProperty(state){
            return state.search.result.property
        }
    },
    actions: {
        getAddresses({ commit }, query) {
            commit('setSearchQuery', query)
            return new Promise((resolve, reject) => {
                const header = {
                    headers: {
                        'Accept': 'application/json',
                        'accept' : 'application/json',
                        'Content-Type': 'application/json',
                        'apikey': '08b803743ac343fb74a8608b288147a3',
                    }
                }
                axios.get(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/address?postalcode=82009&page=1&pagesize=100`,header)
                    .then(response => {
                        console.log(response.data.property)
                        commit('setProperty', response.data.property)
                        resolve(response.data.property)

                    })
                    .catch(error => {
                        reject(error)
                    }
                    )
            }
            )
        }
    }
})

export default store