import { init } from './js/app'
import './js/flatpickr'

import './styles/base.scss'

//Call init function on DOMContentLoaded event
window.addEventListener('DOMContentLoaded', init);

export { init }