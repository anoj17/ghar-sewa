const initialState = {
    newHouse: null,
    currentListingHouse: null,
    housesData: [],
    listingDetails: {},
    allListing:[]
}

const houseReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "CREATE_NEW_HOUSE":
            return {
                ...state,
                newHouse: payload
            }
        case "SAVE_HOUSE_DATA":
            return {
                ...state,
                housesData: payload
            }
        case "CURRENT_NEW_HOUSE":
            return {
                ...state,
                currentListingHouse: payload
            }
        case "GET_LISTING_DETAILS":
            return {
                ...state,
                listingDetails: payload
            }

        case "ALL_LISTING":
                return {
                    ...state,
                    allListing: payload
                }
        default:
            return state
    }

}

export default houseReducer