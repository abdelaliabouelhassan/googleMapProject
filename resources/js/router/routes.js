

import Home from '../components/pages/Home.vue'
import MyAccount from '../components/pages/MyAccount.vue'
import SavedLeads from '../components/pages/SavedLeads.vue'

const routes = [
    { path: '/', component: Home , name: 'home' },
    { path: '/my-account', component: MyAccount, name: 'my-account' },
    { path: '/saved-leads', component: SavedLeads,name:'saved-leads' },
]


export default routes