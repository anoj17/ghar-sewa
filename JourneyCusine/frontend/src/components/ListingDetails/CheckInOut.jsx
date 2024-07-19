import React, { useRef, useState } from 'react'
import { DateRange } from "react-date-range";
// date range selector css
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";

const CheckInOut = ({calendarRef}) => {
    const [showStartCalendar, setShowStartCalendar] = useState(false)
    const [showEndCalendar, setShowEndCalendar] = useState(false)

    const [selectedDate, setSelectedDate] = useState()

    const [disabledDates, setDisabledDates] = useState()


    const handleSelect = (selectedDate) => {
        console.log('selected date', selectedDate)
    }

  return (
    <div>
       <div
            ref={calendarRef}
            className=" absolute border-b-[1.2px] border-neutral-200 shadow-md left-[2px] sm:translate-x-[30%] sm:translate-y-[0%] md:translate-x-[-30%] lg:translate-x-[-20%] xl:translate-x-0 xl:translate-y-0"
          >
            <DateRange
              rangeColors={["#262626"]}
              date={new Date()}
              editableDateInputs={true}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              ranges={selectedDate}
              disabledDates={disabledDates}
              // isDayBlocked={(date) => isDateDisabled(date)}
              direction="vertical"
              showDateDisplay={false}
              minDate={new Date()}
            />
          </div>
    </div>
  )
}

export default CheckInOut
