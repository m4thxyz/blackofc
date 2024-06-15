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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Youtube = void 0;
const yta_1 = require("./src/yta");
const ytsearch_1 = require("./src/ytsearch");
const ytv_1 = require("./src/ytv");
class Youtube {
    headers() {
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
        };
    }
    ytsearch(search) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, ytsearch_1.ytsearch)(search, this.headers());
        });
    }
    ytmp3(search, needSearch) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, yta_1.yta)(search, needSearch, this.headers());
        });
    }
    ytmp4(search, needSearch) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, ytv_1.ytv)(search, needSearch, this.headers());
        });
    }
}
exports.Youtube = Youtube;
;
