import { callApiEndpoint } from "./callApiEndpoint";
import { ServerActionResponse } from "./callApiEndpoint";

export async function getForumActivitiesAction(accessToken: string): Promise<ServerActionResponse> {
    return callApiEndpoint('/api/v1/getForumActivities', accessToken, 'Failed to fetch forum activities', {
        method: 'POST'
    });
}