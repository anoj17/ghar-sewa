import { useDispatch, useSelector } from "react-redux";
import AllReservations from "./AllReservations";
import CancelledReservations from "./CancelledReservations";
import CompletedReservations from "./CompletedReservations";
import UpcomingReservation from "./UpcomingReservation";
import { useEffect, useState } from "react";
import { removeDuplicates } from "../../../hooks/useRemoveDuplicates";
import { getAuthorReservations, getClientReservations } from "../../../redux/actions/reservationsActions";
import api from "../../../backend";

/* eslint-disable react/prop-types */
const ReservationsData = ({ active }) => {
  const user = useSelector((state) => state.user.userDetails);
  console.log('user', user)

  const authorReservations = useSelector(
    (state) => state.reservations.authorReservations
  );

  // const clientReservations = useSelector(
  //   (state) => state.reservations.clientReservations
  // );

  console.log('author reser', authorReservations)

  const [clientReservation, setClientReservation] = useState([])

  const [reservations, setReservations] = useState([]);
  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [completedReservations, setCompletedReservations] = useState([]);
  const dispatch = useDispatch();

  // const getAuthorReservations = () => async (dispatch) => {
  //   try {
  //     const response = await api.get("/reservations/get_author_reservations")

  //     if (response.status === 200) {
  //       dispatch({
  //         type: "AUTHORS_RESERVATIONS",
  //         payload: response.data,
  //       })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const getClientReservations = async () => {
    try {
      const response = await api.get("/reservations/get_client_reservations")
      console.log('success while fetching', response.data)
      setClientReservation(response.data)
    } catch (error) {
      console.log('error while etching', error)
    }
  }

  // getting authors reservation
  useEffect(() => {
    getClientReservations()
    // dispatch(getAuthorReservations());
  }, [user]);

  // removing duplicates
  useEffect(() => {

    setReservations(
      removeDuplicates(authorReservations, "checkIn", "checkOut")
    );

  }, [authorReservations, clientReservation]);

  // setting upcoming and completed reservations
  useEffect(() => {
    const currentDate = new Date().toISOString();

    const upcoming = reservations.filter(
      (reservation) => reservation.checkIn > currentDate
    );
    const completed = reservations.filter(
      (reservation) => reservation.checkOut < currentDate
    );

    setUpcomingReservations(upcoming);
    setCompletedReservations(completed);
  }, [reservations]);

  return (
    <section className="  py-10 flex justify-center items-center overflow-x-auto pl-10 sm:pl-44 lg:pl-0">
      <div className=" text-xl font-semibold">
        {active === 1 ? (
          <>
            <UpcomingReservation data={upcomingReservations} />
          </>
        ) : active === 2 ? (
          <>
            <CompletedReservations data={completedReservations} />
          </>
        ) : active === 3 ? (
          <>
            <CancelledReservations />
          </>
        ) : (
          <>
            <AllReservations data={
              user?.role === 'visitors' ?
                clientReservation :
                reservations
            } role={user?.role} />
          </>
        )}
      </div>
    </section>
  );
};

export default ReservationsData;
