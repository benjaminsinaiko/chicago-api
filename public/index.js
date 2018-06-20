/* global axios */

const state = {}

const getAldermanList = async () => {
  // Get list of Aldermen
  await axios
    .get(`http://localhost:3000/v1/alderman`)
    .then(response => {
      // Save to state
      state.aldermanData = response.data
    })
    .catch(error => {
      console.log(error)
    })
}

const findWard = async () => {
  // Get input name
  let lastName = document.getElementById('last_name').value
  // Filter for lastName
  state.aldermanData.filter(record => {
    if (record.alderman.includes(lastName)) {
      // Save to state
      state.aldermanFullName = record.alderman
      state.ward = record.ward
    }
  })
  // Add to h3 element
  document.getElementById('alderman').innerHTML = `Alderman: ${
    state.aldermanFullName
  }`
  document.getElementById('ward').innerHTML = `Ward: ${state.ward}`
}

const getDate = () => {
  // Get input date
  state.inputDate = document.querySelector('input[type="month"]').value
  console.log(state.inputDate)
  // Add to h3 element
  document.getElementById('date').innerHTML = `Date: ${state.inputDate}`
  //
}

const getGraffitiList = async () => {
  console.log(state.ward)
  await axios
    .get(
      `https://data.cityofchicago.org/resource/cdmx-wzbz.json?creation_date=${
        state.inputDate
      }&ward=${state.ward}`
    )
    .then(response => {
      let requests = response.data
      console.log(requests.length)
      document.getElementById(
        'count'
      ).innerHTML = `Graffiti removal requests (${state.inputDate}): ${
        requests.length
      }`
    })
}

const inputButton = async () => {
  getDate()
  await findWard()
  await getGraffitiList()
}
getAldermanList()
