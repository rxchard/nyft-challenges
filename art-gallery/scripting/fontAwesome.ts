import { Vue } from 'nuxt-property-decorator'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faExpand, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faExpand, faPlay, faPause)
Vue.component('FontAwesome', FontAwesomeIcon)
