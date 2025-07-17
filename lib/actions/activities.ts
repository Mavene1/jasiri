'use server';

import axios from 'axios';
import { isTokenExpired } from '../util/validateToken';

const API_URL = process.env.ACTIVITY_MANAGEMENT_BASE_URL || 'http://34.68.6.39:8000';

export async function getRoleActivitiesAction(accessToken: string) {
    console.log("Using token2:", accessToken);

    // if (isTokenExpired(accessToken)) {
    //     return {
    //       success: false,
    //       data: [],
    //       message: 'Token has expired',
    //     };
    //   }
    try {
        const res = await axios.get(`${API_URL}/api/v1/getRoleActivities`, {
            headers: {
            //   'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            //   'Accept': 'application/json',
            },
            timeout: 10000, // 10 second timeout
          });

        console.log("Res Data: ", res)
        const data = res.data;
        console.log("Data: ", data)

        return {
            success: true,
            data: data,
            message: "Activities fetched successfully",
        };
    } catch (error: any) {
        console.error('Failed to fetch role activities:', error.message);
        return {
            success: false,
            data: [],
            message: 'Failed to fetch activities',
        };
    }
} 

export async function getPriorityAreas(accessToken: string) {
    try {
        const res = await axios.get(`${API_URL}/api/v1/getPriorityAreas`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
            timeout: 10000, // 10 second timeout
          });

        console.log("Res Data: ", res)
        const data = res.data;
        console.log("Data: ", data)

        return {
            success: true,
            data: data,
            message: "Priority Areas fetched successfully",
        };
    } catch (error: any) {
        console.error('Failed to fetch priority areas:', error.message);
        return {
            success: false,
            data: [],
            message: 'Failed to fetch priority areas',
        };
    }
} 
