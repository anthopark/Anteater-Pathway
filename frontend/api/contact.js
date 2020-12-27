import axios from 'axios';
import { StatusCodes } from 'http-status-codes';


const base = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

const extractErrorCode = (message) => {
    return parseInt(message.slice(-3))
}

export const CONTACT_API_CODE = {
    'SUCCESS': 1,
    'FAILED' : 2,
}

export const submitFeedBack = async (issueOption, message, reToken) => {
    
    try {
        const response = await base.post('/contact/feedback', {issueOption: issueOption.value, message, reToken});
        if (response.status === StatusCodes.OK) {
            return CONTACT_API_CODE.SUCCESS;
        } else if (response.status === StatusCodes.BAD_REQUEST) {
            return CONTACT_API_CODE.FAILED;
        }
    } catch (e) {
        const errorCode = extractErrorCode(e.message);
        if (errorCode === StatusCodes.BAD_REQUEST) {
            // possible issue in server - db
            return CONTACT_API_CODE.FAILED;
        } else {
            return CONTACT_API_CODE.FAILED;
        }
    }
}


