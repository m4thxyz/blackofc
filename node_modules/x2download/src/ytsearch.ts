import request from 'request';
import { IHeaders, IYtSearch } from '..';

export function ytsearch(search: string, headers: IHeaders): Promise<IYtSearch[]> {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://yt1s.io/api/ajaxSearch',
            method: 'POST',
            headers: headers.ytis,
            form: { 'q': search, 'vt': 'home' }
        }, function (error, response, body) {
            const parsed = JSON.parse(body)
            const searchers = []
            for (let i = 0; i < parsed.items.length; i++) {
                searchers.push({
                    url: 'https://www.youtube.com/watch?v=' + parsed.items[i].v,
                    title: parsed.items[i].t
                })
            }
            resolve(searchers)
        })
    })
};
