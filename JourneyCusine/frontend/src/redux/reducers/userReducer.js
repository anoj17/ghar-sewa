const initialState = {
    userDetails: null,
    loginResponse: Number,
    responseMessage: '',
    isAuthenticated: false,
    wishlist: []

}

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "USER_SIGN_UP":
            return {
                ...state,
                userDetails: payload.user_details,
                loginResponse: payload.success,
                responseMessage: payload.info
            };
        case "USER_LOG_IN":
            return {
                ...state,
                userDetails: payload.user_details,
                loginResponse: payload.success,
                responseMessage: payload.message,
                isAuthenticated: true
            };
        case "USER_LOG_OUT": {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            return {
                userDetails: null,
                loginResponse: 0,
                responseMessage: ""
            }
        }
        case "GET_USER_DETAILS":
            return {
                userDetails: payload,
                isAuthenticated:true
            }
        case "USER_WISHLIST":
            console.log('in redux payload================',payload)
            return {
                wishlist: payload
            }

        case "CHANGE_USER_ROLE":
            return {
                userDetails: payload.updatedUserDetails,

            }

        default:
            return state
    }
}

export default userReducer;