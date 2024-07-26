const initialState = {
    newReservationsData: null,
    authorReservations: [],
    clientReservations: []

}

const reservationsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "NEW_RESERVATIONS_DATA": {
            return {
                ...state,
                newReservationsData: payload
            }
        }
        case "AUTHORS_RESERVATIONS": {
            return {
                ...state,
                authorReservations: payload
            }
        }
        case "CLIENT_RESERVATIONS": {
            return {
                ...state,
                authorReservations: payload
            }
        }
        default: return state;
    }
}

export default reservationsReducer;