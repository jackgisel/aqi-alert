const axios = require('axios')
const purple = require('purpleair')

const getAQI = async () => {
    try {
        const sensor = await purple.getSensor(13165)
        const aqi = await purple.getAQI(sensor)
        console.log(aqi)
        return aqi
    } catch (e) {
        console.error('Error fetching', e)
    }
}
const WEBHOOK = process.env.WEBHOOK

const postToDiscord = (msg) => {
    axios.post(WEBHOOK, { content: msg }).catch((e) => console.error(e))
}

var minutes = 5,
    the_interval = minutes * 60 * 1000
let windowsClosed = true

postToDiscord('BOT IS LIVE')

setInterval(async function () {
    let aqi = getAQI()
    if (aqi < 100 && windowsClosed) {
        windowsClosed = false
        postToDiscord('🥳🥳🥳  open windows 🥳🥳🥳')
    } else if (!windowClose && aqi < 100) {
        // do nothing bois we living
    } else if (!windowsClosed && aqi > 100) {
        windowsClosed = true
        postToDiscord('😷😷😷  close windows 😷😷😷')
    } else {
        windowsClosed = true
    }
}, the_interval)
