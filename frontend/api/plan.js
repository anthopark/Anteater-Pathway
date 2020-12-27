import axios from 'axios';
import { StatusCodes } from 'http-status-codes';


export const PLAN_SAVED_NEW = 1;
export const PLAN_SAVED_OLD = 2;
export const PLAN_SAVED_FAILED = 3;
export const PLAN_LOADED = 4;
export const PLAN_LOAD_NOT_FOUND = 5;
export const PLAN_LOAD_FAILED = 6;


const base = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

const extractErrorCode = (message) => {
    return parseInt(message.slice(-3))
}


export const savePlan = async (userId, degreePlan, customUnits) => {
    try {
        const response = await base.post('/plan/save', { userId, degreePlan, customUnits });
        if (response.status === StatusCodes.OK) {
            // updated the existing plan
            return PLAN_SAVED_OLD;
        } else if (response.status === StatusCodes.CREATED) {
            // saved to the new plan
            return PLAN_SAVED_NEW;
        }
    } catch (e) {
        const errorCode = extractErrorCode(e.message);
        if (errorCode === StatusCodes.BAD_REQUEST) {
            // possible issue in server - db
            return PLAN_SAVED_FAILED;
        } else {
            return PLAN_SAVED_FAILED;
        }
    }
}


export const loadPlan = async (userId) => {

    const params = { userId };

    try {
        const response = await base.get('/plan/load', { params });
        if (response.status === StatusCodes.OK) {
            return {
                planData: response.data.degreePlan,
                customUnits: response.data.customUnits,
                code: PLAN_LOADED,
            };
        }
    } catch (e) {
        const errorCode = extractErrorCode(e.message);

        if (errorCode === StatusCodes.NOT_FOUND) {
            return {
                planData: [],
                code: PLAN_LOAD_NOT_FOUND,
            };
        } else if (errorCode === StatusCodes.BAD_REQUEST) {
            return {
                planData: [],
                code: PLAN_LOAD_FAILED,
            };
        } else {
            return {
                planData: [],
                code: PLAN_LOAD_FAILED,
            };
        }

    }
}

