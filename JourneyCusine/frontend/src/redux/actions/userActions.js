import api from "../../backend";

/* eslint-disable no-undef */
export const userSignUp = (userData) => async (dispatch) => {
    dispatch({
        type: "USER_SIGN_UP",
        payload: userData
    })
}

export const userLogIn = (userData) => async (dispatch) => {
    console.log(userData.user_details)
    dispatch({
        type: "USER_LOG_IN",
        payload: userData
    })
}

export const getAllWishList = () => async (dispatch) => {
    try {
        const response = await api.get("/wishlist");
        if (response.status === 200) {
            console.log('wishlist data fetching',response?.data)
            dispatch({
                type: "USER_WISHLIST",
                payload: response.data
            })
        } else {
            console.log('not 200',response)

        }     
    } catch (error) {
        console.log('error occured while fetching wishlist',error)    
    }
}

export const addToWishlist = (data) => async (dispatch) => {
    try {
        const response = await api.post("/wishlist/", {
            listingId: data
        });
        // if (response.data.status === 200) {
        //     console.log(response.data)
        //     dispatch({
        //         type: "USER_WISHLIST",
        //         payload: response.data
        //     })
        // }      
    } catch (error) {
        console.log('error occured while adding wishlist',error)    
    }
}

export const removeFromWishlist = (data) => async (dispatch) => {
    try {
        const response = await api.delete(`/wishlist/${data}`);
        // if (response.data.status === 200) {
        //     console.log(response.data)
        //     dispatch({
        //         type: "USER_WISHLIST",
        //         payload: response.data
        //     })
        // }      
    } catch (error) {
        console.log('error occured while deleting wishlist',error)    
    }
}



export const getUser = () => async (dispatch, getState) => {
    const { userDetails } = getState().user;

    try {
        const response = await api.post("/auth/get_user_details");
        console.log(response.data?.user_details, "GET USER DETAILS");
        if (response.data.status === 200) {
            // saving user details from db
            dispatch({
                type: "GET_USER_DETAILS",
                payload: response.data.user_details,
            });
            // saving houses data from db
            dispatch({
                type: "SAVE_HOUSE_DATA",
                payload: response.data.house_data
            })
        } else {
            dispatch({ type: "USER_LOG_OUT" });
        }
    } catch (error) {
        // Handle error
        console.log('error fetching user data',error)
    }
};

export const userRole = () => async (dispatch, getState) => {
    const { userDetails } = getState().user;

    if (userDetails?.role === "host") {
        console.log("already a hoast")
    }


    try {
        const response = await api.post("/auth/become_a_host", { role: "host" });
        console.log(response)
        const currentHouseId = response.data?.house?._id;

        /* The code `if (currentHouseId) {
                    JSON.stringify(localStorage.setItem("currentHouseId", currentHouseId))
                }` is checking if the `currentHouseId` variable has a value. If it does, it is
        converting the value to a JSON string using `JSON.stringify()` and then storing it in the
        `localStorage` with the key "currentHouseId". */
        if (currentHouseId) {
            JSON.stringify(localStorage.setItem("currentHouseId", currentHouseId))
        }
        if (response.data.succeed === 1) {
            dispatch({
                type: "CHANGE_USER_ROLE",
                payload: response.data
            })
            dispatch({
                type: "CURRENT_NEW_HOUSE",
                payload: response.data.house
            })
        }
    } catch (error) {
        console.log(error)
    }
}


export const userLogOut = () => async (dispatch) => {
    const response = await api.post("/auth/logout");
    console.log(response)
    dispatch({ type: "USER_LOG_OUT" })
}