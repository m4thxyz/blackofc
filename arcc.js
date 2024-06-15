const acrcloud = require("acrcloud")
const fs = require("fs")

const arcloud = async (Aud64) => {

let acr = new acrcloud({
   host: "identify-us-west-2.acrcloud.com/",
   access_key: "5fa558ba9eebbab70db053014f283431",
   access_secret: "4zblfTHO0JNtvRVggdamzuvABy9TKN9FPjyz0f3w",
})

let audd = Buffer.from(Aud64, "base64")
let data = await acr.identify(audd)
let hasil = []
hasil.push({
 artista: data.metadata.music[0].artists[0].name,
 album: data.metadata.music[0].album.name,
 titulo: data.metadata.music[0].title,
 rotulo: data.metadata.music[0].label
})
return hasil
}

module.exports = { arcloud }