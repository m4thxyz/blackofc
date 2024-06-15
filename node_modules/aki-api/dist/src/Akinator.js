"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answers = void 0;
const functions_1 = require("./functions");
const Client_1 = require("./constants/Client");
const https_proxy_agent_1 = require("https-proxy-agent");
var answers;
(function (answers) {
    answers[answers["Yes"] = 0] = "Yes";
    answers[answers["No"] = 1] = "No";
    answers[answers["DontKnow"] = 2] = "DontKnow";
    answers[answers["Probably"] = 3] = "Probably";
    answers[answers["ProbablyNot"] = 4] = "ProbablyNot";
})(answers = exports.answers || (exports.answers = {}));
class Akinator {
    constructor({ region, childMode, proxyOptions }) {
        if (!region || !Client_1.regions.includes(region)) {
            throw new Error('Please specify a correct region. You can import regions I support or view docs. Then use it like so: new Aki({ region })');
        }
        this.currentStep = 0;
        this.region = region;
        this.uri = undefined;
        this.urlApiWs = undefined;
        this.progress = 0.00;
        this.guessCount = 0;
        this.childMode = {
            childMod: childMode === true,
            softConstraint: childMode === true ? encodeURIComponent("ETAT='EN'") : '',
            questionFilter: childMode === true ? encodeURIComponent('cat=1') : '',
        };
        if (proxyOptions) {
            this.config = {
                httpsAgent: new https_proxy_agent_1.HttpsProxyAgent(proxyOptions),
                proxy: false,
            };
        }
        else {
            this.config = {};
        }
        this.question = '';
        this.answers = [];
    }
    /**
    * Starts the akinator session and game.
    */
    async start() {
        const server = await (0, functions_1.regionURL)(this.region, this.config);
        if (!server)
            throw new Error(`Could not find a server matching the region ${this.region}`);
        this.uri = server.url;
        this.urlApiWs = server.urlWs;
        this.uriObj = await (0, functions_1.getSession)(this.config);
        if (this.uriObj instanceof Error) {
            throw this.uriObj;
        }
        this.uid = this.uriObj.uid;
        this.frontaddr = this.uriObj.frontaddr;
        const url = `${this.uri}/new_session?callback=${Client_1.jQuery + new Date().getTime()}&urlApiWs=${this.urlApiWs}&partner=1&childMod=${this.childMode.childMod}&player=website-desktop&uid_ext_session=${this.uid}&frontaddr=${this.frontaddr}&constraint=ETAT<>'AV'&soft_constraint=${this.childMode.softConstraint}&question_filter=${this.childMode.questionFilter}`;
        const result = await (0, functions_1.request)(url, 'identification', this.region, this.config);
        if (result instanceof functions_1.AkinatorAPIError) {
            throw result;
        }
        const { parameters } = result;
        if ('identification' in parameters) {
            this.session = parameters.identification.session;
            this.signature = parameters.identification.signature;
            this.question = parameters.step_information.question;
            this.challenge_auth = parameters.identification.challenge_auth;
            this.answers = parameters.step_information.answers.map((ans) => ans.answer);
            return {
                answers: parameters.step_information.answers.map((ans) => ans.answer),
                question: parameters.step_information.question
            };
        }
        else {
            throw new functions_1.AkinatorAPIError(result, this.region);
        }
    }
    /*
     * Continue to guess after a "win" (contine to play after a wrong result).
     */
    async continue() {
        if (!this.uri || !this.urlApiWs)
            throw new Error(Client_1.noUriMsg);
        if (!this.uriObj || !this.session || !this.signature)
            throw new Error(Client_1.noSessionMsg);
        const query = new URLSearchParams({
            callback: Client_1.jQuery + new Date().getTime(),
            session: this.session,
            signature: this.signature,
            step: this.currentStep.toString(),
            question_filter: this.childMode.questionFilter
        });
        if (this.childMode.childMod) {
            query.append('childMod', this.childMode.childMod.toString());
        }
        const url = `${this.urlApiWs}/exclusion?${query.toString()}`;
        const result = await (0, functions_1.request)(url, 'answers', this.region, this.config);
        if (result instanceof functions_1.AkinatorAPIError) {
            throw result;
        }
        const { parameters } = result;
        if ('progression' in parameters) {
            this.currentStep += 1;
            this.progress = parseFloat(parameters.progression);
            this.question = parameters.question;
            this.answers = parameters.answers.map((ans) => ans.answer);
            return {
                answers: parameters.answers.map((ans) => ans.answer),
                question: parameters.question
            };
        }
        else {
            throw new functions_1.AkinatorAPIError(result, this.region);
        }
    }
    /**
     * Gets the next question for the akinator session.
     * @param {answers} answerID the answer to the question
     */
    async step(answer) {
        if (!this.uri || !this.urlApiWs)
            throw new Error(Client_1.noUriMsg);
        if (!this.uriObj || !this.session || !this.signature || !this.frontaddr)
            throw new Error(Client_1.noSessionMsg);
        const query = new URLSearchParams({
            callback: Client_1.jQuery + new Date().getTime(),
            urlApiWs: this.urlApiWs,
            childMod: this.childMode.childMod.toString(),
            session: this.session,
            signature: this.signature,
            step: this.currentStep.toString(),
            answer: answer.toString(),
            frontaddr: this.frontaddr,
            question_filter: this.childMode.questionFilter
        });
        const url = `${this.uri}/answer_api?${query.toString()}`;
        const result = await (0, functions_1.request)(url, 'answers', this.region, this.config);
        if (result instanceof functions_1.AkinatorAPIError) {
            throw result;
        }
        const { parameters } = result;
        if ('progression' in parameters) {
            this.currentStep += 1;
            this.progress = parseFloat(parameters.progression);
            this.question = parameters.question;
            this.answers = parameters.answers.map((ans) => ans.answer);
            return {
                answers: parameters.answers.map((ans) => ans.answer),
                question: parameters.question
            };
        }
        else {
            throw new functions_1.AkinatorAPIError(result, this.region);
        }
    }
    /**
     * Reverts the game back a previous step.
     */
    async back() {
        if (!this.uri || !this.urlApiWs)
            throw new Error(Client_1.noUriMsg);
        if (!this.uriObj || !this.session || !this.signature)
            throw new Error(Client_1.noSessionMsg);
        const query = new URLSearchParams({
            callback: Client_1.jQuery + new Date().getTime(),
            session: this.session,
            childMod: this.childMode.childMod.toString(),
            signature: this.signature,
            step: this.currentStep.toString(),
            answer: '-1',
            question_filter: this.childMode.questionFilter
        });
        const url = `${this.urlApiWs}/cancel_answer?${query.toString()}`;
        const result = await (0, functions_1.request)(url, 'answers', this.region, this.config);
        if (result instanceof functions_1.AkinatorAPIError) {
            throw result;
        }
        const { parameters } = result;
        if ('progression' in parameters) {
            this.currentStep -= 1;
            this.progress = parseFloat(parameters.progression);
            this.question = parameters.question;
            this.answers = parameters.answers.map((ans) => ans.answer);
            return {
                answers: parameters.answers.map((ans) => ans.answer),
                question: parameters.question
            };
        }
        else {
            throw new functions_1.AkinatorAPIError(result, this.region);
        }
    }
    /**
     * The akinator attempts to make a guess and win the game.
     */
    async win() {
        if (!this.uri || !this.urlApiWs)
            throw new Error(Client_1.noUriMsg);
        if (!this.uriObj || !this.signature || !this.session)
            throw new Error(Client_1.noSessionMsg);
        const query = new URLSearchParams({
            callback: Client_1.jQuery + new Date().getTime(),
            signature: this.signature,
            step: this.currentStep.toString(),
            session: this.session
        });
        const url = `${this.urlApiWs}/list?${query.toString()}`;
        const result = await (0, functions_1.request)(url, 'elements', this.region, this.config);
        if (result instanceof functions_1.AkinatorAPIError) {
            throw result;
        }
        const { parameters } = result;
        if ('elements' in parameters) {
            const answers = (parameters.elements || []).map((ele) => ele.element);
            for (let i = 0; i < answers.length; i += 1) {
                answers[i].nsfw = answers[i].valide_contrainte == '0';
            }
            const guessCount = parseInt(parameters.NbObjetsPertinents, 10);
            this.answers = answers;
            this.guessCount = guessCount;
            return {
                guesses: answers,
                guessCount: guessCount
            };
        }
        else {
            throw new functions_1.AkinatorAPIError(result, this.region);
        }
    }
}
exports.default = Akinator;
//# sourceMappingURL=Akinator.js.map