"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regionURL = exports.request = exports.AkinatorAPIError = void 0;
const axios_1 = require("axios");
const Client_1 = require("../constants/Client");
const os = require("os");
const params = Object.freeze({
    gzip: true,
    resolveWithFullResponse: true,
    validateStatus: () => true,
    timeout: 10000,
});
// Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:10.0) Gecko/20100101 Firefox/10.0
const headers = {
    'User-Agent': `Mozilla/5.0 (${os.type().replace('_', ' ')} ${os.release()}; ${os.platform()}; ${os.arch()}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36`,
    'x-requested-with': 'XMLHttpRequest',
};
const subject_ids = {
    characters: 1,
    Objects: 2,
    Animals: 14
};
/**
 * gets the server based on the provided region, so we don't rely on hard coded values.
 * @param {string} region the requested region to be parsed
 * @return {object} obj with url and urlWs or undefined
 */
const getServer = async (region, axiosConfig) => {
    try {
        const split = region.split('_');
        const [language, themeName] = split;
        const url = `https://${language}.akinator.com`;
        const { data } = await axios_1.default.get(url, Object.assign({}, axiosConfig));
        const regex = /\[{"translated_theme_name":"[\s\S]*","urlWs":"https:\\\/\\\/srv[0-9]+\.akinator\.com:[0-9]+\\\/ws","subject_id":"[0-9]+"}]/gim;
        const parsed = JSON.parse(data.match(regex));
        if (!parsed || !parsed[0] || !parsed[0].urlWs || parsed.length <= 0)
            return undefined;
        const _themeName = themeName ? themeName.replace(themeName.charAt(0), themeName.charAt(0).toUpperCase()) : 'characters';
        const subjectId = subject_ids[_themeName];
        const found = parsed.find(theme => parseInt(theme.subject_id) === subjectId);
        const obj = {
            url,
            urlWs: themeName && found && found.urlWs ? found.urlWs : parsed[0].urlWs,
        };
        return obj;
    }
    catch (error) {
        console.error(error);
    }
    return undefined;
};
class AkinatorAPIError extends Error {
    constructor(data, region) {
        super(`A problem occurred with making the request data: ${data}: region: ${region}`);
        this.message = this.mapError(data.completion, region);
    }
    mapError(c, region) {
        if (!c)
            return `A problem occurred with making the request.\nRequest Body: ${c}`;
        switch (c) {
            case 'KO - SERVER DOWN': return `Akinator servers are down for the "${region}" region. Check back later. ${c}`;
            case 'KO - TECHNICAL ERROR': return `Akinator's servers have had a technical error for the "${region}" region. Check back later. ${c}`;
            case 'KO - INCORRECT PARAMETER': return `You inputted a wrong paramater, this could be session, region, or signature. ${c}`;
            case 'KO - TIMEOUT': return `Your Akinator session has timed out. ${c}`;
            case 'WARN - NO QUESTION': return `No question found. ${c}`;
            case 'KO - MISSING PARAMETERS': return `Akinator needs more parameters. Please make an issue at: ${Client_1.issues}`;
            default: return `Unknown error has occurred. Server response: ${c}`;
        }
    }
}
exports.AkinatorAPIError = AkinatorAPIError;
// example output: jQuery331023608747682107778_1615444627875({"completion":"OK","parameters":{"identification":{"channel":0,"session":"459","signature":"223731835","challenge_auth":"8ebe521c-5991-4625-b081-6066352649e5"},"step_information":{"question":"Does your character really exist?","answers":[{"answer":"Yes"},{"answer":"No"},{"answer":"Don't know"},{"answer":"Probably"},{"answer":"Probably not"}],"step":"0","progression":"0.00000","questionid":"266","infogain":"0.607602"}}}
const request = async (url, checkParamProperty, region, axiosConfig) => {
    const { status, data } = await axios_1.default.get(url, Object.assign({ headers, params }, axiosConfig));
    if (status !== 200 || !data) {
        throw new Error(`A problem occurred with making the request. status: ${status}`);
    }
    const beginningParse = data.indexOf('(');
    const jsonString = data.substring(beginningParse + 1, data.length - 1);
    const result = JSON.parse(jsonString);
    if (!result || result.completion != 'OK' || !(checkParamProperty in result.parameters)) {
        throw new AkinatorAPIError(result, region);
    }
    return result;
};
exports.request = request;
/**
 * Returns the url from the correct region.
 * @param userRegion the region provided
 * @param axiosConfig the proxy config for axios
 * @returns {Promise<AkiURL>} the generated url for that region
 */
const regionURL = async (userRegion, axiosConfig) => getServer(userRegion.toLowerCase(), axiosConfig);
exports.regionURL = regionURL;
//# sourceMappingURL=Request.js.map