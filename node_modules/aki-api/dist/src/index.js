"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answers = exports.regions = exports.Aki = void 0;
const fs = require("fs");
const https = require("https");
https.globalAgent.options.ca = fs.readFileSync('node_modules/node_extra_ca_certs_mozilla_bundle/ca_bundle/ca_intermediate_root_bundle.pem');
const Akinator_1 = require("./Akinator");
exports.Aki = Akinator_1.default;
Object.defineProperty(exports, "answers", { enumerable: true, get: function () { return Akinator_1.answers; } });
const Client_1 = require("./constants/Client");
Object.defineProperty(exports, "regions", { enumerable: true, get: function () { return Client_1.regions; } });
//# sourceMappingURL=index.js.map