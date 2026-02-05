import { callApiEndpoint } from "./callApiEndpoint";
import { ServerActionResponse } from "./callApiEndpoint";

export async function createActivityAction(accessToken: string, activityData: any): Promise<ServerActionResponse> {
    return callApiEndpoint('/api/createActivity', accessToken, 'Failed to create activity', {
        method: 'POST',
        body: activityData
    });
}

export async function getRoleActivitiesAction(accessToken: string): Promise<ServerActionResponse> {
    return callApiEndpoint('/api/v1/getRoleActivities', accessToken, 'Failed to fetch activities');
}

export async function getCountiesAction(accessToken: string): Promise<ServerActionResponse> {
    return callApiEndpoint('/api/v1/getCounties', accessToken, 'Failed to fetch counties');
}

export async function getPriorityAreasAction(accessToken: string): Promise<ServerActionResponse> {
    return callApiEndpoint('/api/v1/getPriorityAreas', accessToken, 'Failed to fetch priority areas');
}

export async function getOutcomesAction(accessToken: string, priorityAreaId: string): Promise<ServerActionResponse> {
    return callApiEndpoint('/api/v1/getOutcomes', accessToken, 'Failed to fetch outcomes', {
        method: 'GET',
        body: { priorityAreaId }
    });
}

export async function getSubCountiesAction(accessToken: string, countyName: string): Promise<ServerActionResponse> {
    return callApiEndpoint('/api/v1/getSubCounties', accessToken, 'Failed to fetch sub counties', {
        method: 'GET',
        body: { county : countyName }
    });
}

export async function fetchActivityReportsAction(accessToken: string, activityId: string): Promise<ServerActionResponse> {
    return callApiEndpoint('/api/v1/fetchReports', accessToken, 'Failed to fetch activity reports', {
        method: 'GET',
        body: { activityId }
    });
}

export async function downloadReportAction(accessToken: string, reportId: string): Promise<ServerActionResponse> {
    return callApiEndpoint('/api/v1/download', accessToken, 'Failed to download report', {
        method: 'GET',
        body: { reportId }
    });
}

//this request body is form-data
export async function completeActivityAndReportAction(accessToken: string, activityId: string, actualOutreach: number, male: number, female: number, youth: number, pwd: number, cost: number, challenges: string, remarks: string, file: File): Promise<ServerActionResponse> {
    return callApiEndpoint('/api/v1/completeActivityAndReport', accessToken, 'Failed to complete activity and report', {
        method: 'POST',
        body: { activityId, actualOutreach, male, female, youth, pwd, cost, challenges, remarks, file }
    });
}

