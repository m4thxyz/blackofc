"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regions = exports.noSessionMsg = exports.noUriMsg = exports.jQuery = exports.issues = exports.patternSession = void 0;
exports.patternSession = new RegExp("var uid_ext_session = '(.*)';\\n.*var frontaddr = '(.*)';");
exports.issues = 'https://github.com/jgoralcz/aki-api/issues';
exports.jQuery = 'jQuery331023608747682107778_';
exports.noUriMsg = 'Could not find the uri or UrlApiWs. This most likely means that you have not started the game!';
exports.noSessionMsg = 'Could not find the game session. Please make sure you have started the game!';
exports.regions = [
    'en',
    'en_objects',
    'en_animals',
    'ar',
    'cn',
    'de',
    'de_animals',
    'es',
    'es_animals',
    'fr',
    'fr_objects',
    'fr_animals',
    'il',
    'it',
    'it_animals',
    'jp',
    'jp_animals',
    'kr',
    'nl',
    'pl',
    'pt',
    'ru',
    'tr',
    'id',
];
//# sourceMappingURL=Client.js.map