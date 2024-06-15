import request from "request"
import { yta } from "./src/yta"
import { ytsearch } from "./src/ytsearch"
import { ytv } from "./src/ytv"

export interface IHeaders {
    ytis: {
        'User-Agent': string;
        'Content-Type': string;
    };
    download: {
        'User-Agent': string;
        'Content-Type': string;
        'x-requested-key': string;
    }
}
export interface IYtResult {
    dl_link: string;
    thumbnail: string;
    title: string;
    quality: string;
    qualitys: string[];
    url: string;
    channel: string;
    needSearch: boolean;
}
export interface IYtSearch {
    url: string;
    title: string;
}
export class Youtube {
    private headers(): IHeaders {
        return {
            ytis: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            download: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'x-requested-key': 'de0cfuirtgf67a'
            }
        }
    }
    public async ytsearch(search: string): Promise<IYtSearch[]> {
        return await ytsearch(search, this.headers())
    }
    public async ytmp3(search: string, needSearch: boolean): Promise<IYtResult> {
        return await yta(search, needSearch, this.headers())
    }
    public async ytmp4(search: string, needSearch: boolean): Promise<IYtResult> {
        return await ytv(search, needSearch, this.headers())
    }
};