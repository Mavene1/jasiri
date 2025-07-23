'use server';

import axios from 'axios';
import { isTokenExpired, isValidJWT } from '../util/validateToken';

const API_URL = process.env.ACTIVITY_MANAGEMENT_BASE_URL;

// Types for better type safety
interface ApiResponse<T = any> {
    status: 'success' | 'error';
    count?: number;
    message: string;
    data: T;
}

interface ServerActionResponse<T = any> {
    success: boolean;
    data: T;
    message: string;
    count?: number;
}

// Generic API caller helper
async function callApiEndpoint<T = any>(
    endpoint: string,
    accessToken: string,
    fallbackErrorMessage: string,
    options?: {
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
        body?: any;
    }
): Promise<ServerActionResponse<T>> {
    // Optional: Still check token expiry on client side if you have this utility
    // This can help avoid unnecessary network calls
    if (isTokenExpired(accessToken)) {
        return {
            success: false,
            data: [] as T,
            message: 'Token has expired',
        };
    }

    if (!isValidJWT(accessToken)) {
        return {
            success: false,
            data: [] as T,
            message: 'Invalid token',
        };
    }

    try {
        const config: any = {
            headers: { 'Authorization': `Bearer ${accessToken}` },
            timeout: 10000,
        };

        if (options?.body) {
            config.headers['Content-Type'] = 'application/json';
        }

        const method = options?.method || 'GET';
        const url = `${API_URL}${endpoint}`;

        let res;
        if (method === 'GET') {
            res = await axios.request<ApiResponse<T>>({
                url,
                method,
                headers: config.headers,
                timeout: config.timeout,
                ...(options?.body ? { data: options.body } : {}), // include body if provided
            });
        } else {
            res = await axios.request<ApiResponse<T>>({
                url,
                method,
                headers: config.headers,
                timeout: config.timeout,
                data: options?.body, // body is expected for POST, PUT, etc.
            });
        }

        // Only 200 responses have the structured format
        if (res.status === 200 && res.data) {
            const apiResponse = res.data;

            // Your API only returns this format on success, but let's be defensive
            if (apiResponse.status === 'success') {
                return {
                    success: true,
                    data: apiResponse.data,
                    message: apiResponse.message,
                    count: apiResponse.count,
                };
            } else {
                // This case might not occur based on your description, but keeping it safe
                return {
                    success: false,
                    data: [] as T,
                    message: apiResponse.message || 'API returned error status',
                };
            }
        } else {
            // Unexpected response format
            return {
                success: false,
                data: [] as T,
                message: 'Unexpected response format',
            };
        }

    } catch (error: any) {
        let errorMessage = fallbackErrorMessage;

        console.log("Error: ", error)

        // Handle specific HTTP status codes
        if (error.response?.status === 401) {
            errorMessage = 'Authentication failed - token expired or invalid';
        } else if (error.response?.status === 403) {
            errorMessage = 'Access forbidden - insufficient permissions';
        } else if (error.response?.status === 404) {
            errorMessage = 'Endpoint not found';
        } else if (error.response?.status >= 500) {
            errorMessage = 'Server error - please try again later';
        } else if (error.code === 'ECONNABORTED') {
            errorMessage = 'Request timeout - please try again';
        } else if (error.code === 'ECONNREFUSED') {
            errorMessage = 'Unable to connect to server';
        }

        return {
            success: false,
            data: [] as T,
            message: errorMessage,
        };
    }
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