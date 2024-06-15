import request from "request"
import { IHeaders, IYtResult, Youtube } from ".."

export async function yta(url: string, needSearch: boolean, headers: IHeaders): Promise<IYtResult> {
    return new Promise(async (resolve, reject) => {
      if (needSearch) {
        const search = await new Youtube().ytsearch(url)
        url = search[0].url
      }
      request({
        url: 'https://yt1s.io/api/ajaxSearch',
        method: 'POST',
        headers: headers.ytis,
        form: { 'q': url, 'vt': 'mp3' }
      }, function (error, response, body) {
        const result = JSON.parse(body)
        var thumb = `https://i.ytimg.com/vi/${result.vid}/0.jpg`
        let quality = []
        Object.keys(result.links.mp3).map((i) => {
          quality.push(result.links.mp3[i].k)
        })
        request({
          url: 'https://backend.svcenter.xyz/api/convert-by-45fc4be8916916ba3b8d61dd6e0d6994',
          method: 'POST',
          headers: headers.download,
          form: {
            'v_id': result.vid,
            'ftype': 'mp3',
            'fquality': Number(quality[0]),
            'token': result.token,
            'timeExpire': result.timeExpires,
            'client': 'yt1s.io'
          }
        }, function (error, response, body) {
          resolve({
            dl_link: JSON.parse(body).d_url,
            thumbnail: thumb,
            title: result.title,
            quality: quality[0],
            qualitys: quality,
            url: url,
            channel: result.a,
            needSearch: needSearch
          })
        })
      })
    })
  };