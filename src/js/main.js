import 'bootstrap/dist/css/bootstrap.min.css'

import '../css/main.css'

import './icons'
import './check-updates'
import { prepareForm } from './form-util'
import { warnFacebookBrowserUserIfNecessary } from './facebook-util'
import { addVersion } from './util'
import { createForm } from './form'
import { $ } from './dom-utils'

warnFacebookBrowserUserIfNecessary()
createForm()
prepareForm()
addVersion(process.env.VERSION)

function docReady () {
  // see if DOM is already available
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // call on next available tick
    const fields = ['firstname', 'lastname', 'birthday', 'placeofbirth', 'address', 'city', 'zipcode']
    fields.forEach(field => {
      if (localStorage.getItem(field) != null) {
        $(`#field-${field}`).value = localStorage.getItem(field)
      }
      auto()
    })
  } else {
    document.addEventListener('DOMContentLoaded', docReady)
  }
}
docReady()

function auto () {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  if (urlParams.has('auto')) {
    const reason = urlParams.get('auto')
    $(`#checkbox-${reason}`).checked = true
    $('#generate-btn').click()
  }
}
