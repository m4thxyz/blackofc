import { LemurSummaryParams, LemurActionItemsParams, LemurQuestionAnswerParams, LemurTaskParams, LemurSummaryResponse, LemurQuestionAnswerResponse, LemurActionItemsResponse, LemurTaskResponse, PurgeLemurRequestDataResponse, LemurResponse } from "../..";
import { BaseService } from "../base";
export declare class LemurService extends BaseService {
    summary(params: LemurSummaryParams): Promise<LemurSummaryResponse>;
    questionAnswer(params: LemurQuestionAnswerParams): Promise<LemurQuestionAnswerResponse>;
    actionItems(params: LemurActionItemsParams): Promise<LemurActionItemsResponse>;
    task(params: LemurTaskParams): Promise<LemurTaskResponse>;
    /**
     * Retrieve a LeMUR response that was previously generated.
     * @param id - The ID of the LeMUR request you previously made. This would be found in the response of the original request.
     * @returns The LeMUR response.
     */
    getResponse<T extends LemurResponse>(id: string): Promise<T>;
    getResponse(id: string): Promise<LemurResponse>;
    /**
     * Delete the data for a previously submitted LeMUR request.
     * @param id - ID of the LeMUR request
     */
    purgeRequestData(id: string): Promise<PurgeLemurRequestDataResponse>;
}
