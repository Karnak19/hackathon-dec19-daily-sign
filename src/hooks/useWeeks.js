import { useState, useEffect } from "react";
import moment from "moment";
import { pad } from "../utils";

export default function useWeek() {
  const [currentWeek, setCurrentWeek] = useState(moment().week());
  const [start, setStart] = useState(
    moment()
      .week(currentWeek)
      .startOf("week")
      .dayOfYear()
  );
  const [end, setEnd] = useState(
    moment()
      .week(currentWeek)
      .endOf("week")
      .dayOfYear()
  );
  const [startOfWeek, setStartOfWeek] = useState(null);
  const [endOfWeek, setEndOfWeek] = useState(null);
  const [week, setWeek] = useState([]);

  useEffect(() => {
    setStart(
      moment()
        .week(currentWeek)
        .startOf("week")
        .dayOfYear()
    );
    setEnd(
      moment()
        .week(currentWeek)
        .endOf("week")
        .dayOfYear()
    );

    setStartOfWeek(
      parseInt(
        `${moment()
          .week(currentWeek)
          .startOf("week")
          .year()}${pad(
          moment()
            .week(currentWeek)
            .startOf("week")
            .dayOfYear()
        )}`,
        10
      )
    );
    setEndOfWeek(
      parseInt(
        `${moment()
          .week(currentWeek)
          .startOf("week")
          .year()}${pad(
          moment()
            .week(currentWeek)
            .endOf("week")
            .dayOfYear()
        )}`,
        10
      )
    );
  }, [currentWeek]);

  useEffect(() => {
    const dateArray = [];
    for (let i = 1; i < 6; i++) {
      dateArray[i - 1] = {
        date: moment()
          .day(i + start - 5)
          .toDate(),
        day: parseInt(
          `${moment()
            .day(i)
            .year()}${pad(
            moment()
              .day(i + start - 5) // I don't know why, but I need to minus 5 to work properly
              .dayOfYear()
          )}`,
          10
        )
      };
    }
    setWeek(dateArray);
  }, [start, end]);

  useEffect(() => {
    const dateArray = [];
    for (let i = 1; i < 6; i++) {
      dateArray[i - 1] = {
        date: moment()
          .day(i)
          .toDate(),
        day: parseInt(
          `${moment()
            .day(i)
            .year()}${pad(
            moment()
              .day(i)
              .dayOfYear()
          )}`,
          10
        )
      };
    }
    setWeek(dateArray);
    // eslint-disable-next-line
  }, []);

  const decrementWeek = () => {
    setCurrentWeek(currentWeek - 1);
  };
  const incrementWeek = () => {
    setCurrentWeek(currentWeek + 1);
  };

  return {
    currentWeek,
    incrementWeek,
    decrementWeek,
    week,
    startOfWeek,
    endOfWeek
  };
}
