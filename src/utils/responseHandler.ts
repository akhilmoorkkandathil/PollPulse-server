// utils/responseHandler.ts

export const CreateSuccess = (
    statusCode: number, 
    successMessage: string, 
    data?: any, 
    access_token?: string
) => {
    const successObj = {
        success: [200, 204, 201].some(a => a === statusCode),
        status: statusCode,
        message: successMessage,
        data: data,
        token: access_token,
    };
    return successObj;
};

export const CreateError = (statusCode: number, errorMessage: string) => {
    const errObj = {
        status: statusCode,
        message: errorMessage,
    };
    return errObj;
};
