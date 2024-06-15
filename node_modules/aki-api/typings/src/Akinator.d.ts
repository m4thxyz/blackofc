import { guess } from './functions';
import { region } from './constants/Client';
import { HttpsProxyAgentOptions } from 'https-proxy-agent';
import { AxiosRequestConfig } from 'axios';
interface question {
    question: string;
    answers: ('Yes' | 'No' | 'Don\'t Know' | 'Probably' | 'Probably not' | string)[];
}
interface winResult {
    guessCount: number;
    guesses: guess[];
}
interface AkinatorConstructor {
    region: region;
    childMode?: boolean;
    proxyOptions?: string | HttpsProxyAgentOptions<any>;
}
export declare enum answers {
    Yes = 0,
    No = 1,
    DontKnow = 2,
    Probably = 3,
    ProbablyNot = 4
}
export default class Akinator {
    currentStep: number;
    region: region;
    uri: string | undefined;
    urlApiWs: string | undefined;
    uriObj: {
        uid: string;
        frontaddr: string;
    } | undefined;
    session: string | undefined;
    progress: number;
    childMode: {
        childMod: boolean;
        softConstraint: string;
        questionFilter: string;
    };
    /** @deprecated use the `guesses` property from `win()` instead. */
    answers: ('Yes' | 'No' | 'Don\'t Know' | 'Probably' | 'Probably not')[] | guess[];
    /** @deprecated use the `guessCount` property from `start()` and `step()` instead */
    guessCount: number;
    /** @deprecated use the `question` property from `start()` and `step()` instead */
    question: string | undefined;
    uid: string | undefined;
    frontaddr: string | undefined;
    signature: string | undefined;
    challenge_auth: string | undefined;
    config: AxiosRequestConfig;
    constructor({ region, childMode, proxyOptions }: AkinatorConstructor);
    /**
    * Starts the akinator session and game.
    */
    start(): Promise<question>;
    continue(): Promise<question>;
    /**
     * Gets the next question for the akinator session.
     * @param {answers} answerID the answer to the question
     */
    step(answer: answers): Promise<question>;
    /**
     * Reverts the game back a previous step.
     */
    back(): Promise<question>;
    /**
     * The akinator attempts to make a guess and win the game.
     */
    win(): Promise<winResult>;
}
export {};
