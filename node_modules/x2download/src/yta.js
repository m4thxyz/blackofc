"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.yta = void 0;
const request_1 = __importDefault(require("request"));
const __1 = require("..");
function yta(url, needSearch, headers) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (needSearch) {
                const search = yield new __1.Youtube().ytsearch(url);
                url = search[0].url;
            }
            (0, request_1.default)({
                url: 'https://x2download.app/api/ajaxSearch',
                method: 'POST',
                headers: headers.ytis,
                form: { 'q': url, 'vt': 'mp3' }
            }, function (error, response, body) {
                const result = JSON.parse(body);
                var thumb = `https://i.ytimg.com/vi/${result.vid}/0.jpg`;
                let quality = [];
                Object.keys(result.links.mp3).map((i) => {
                    quality.push(result.links.mp3[i].k);
                });
                (0, request_1.default)({
                    url: 'https://backend.svcenter.xyz/api/convert-by-45fc4be8916916ba3b8d61dd6e0d6994',
                    method: 'POST',
                    headers: headers.download,
                    form: {
                        'v_id': result.vid,
                        'ftype': 'mp3',
                        'fquality': Number(quality[0]),
                        'token': result.token,
                        'timeExpire': result.timeExpires,
                        'client': 'x2download.app'
                    }
                }, function (error, response, body) {
                    resolve({
                        dl_link: JSON.parse(body).d_url,
                        thumbnail: thumb,
                        title: result,
                        quality: quality[0],
                        qualitys: quality,
                        url: url,
                        channel: result.a,
                        needSearch: needSearch
                    });
                });
            });
        }));
    });
}
exports.yta = yta;
;
