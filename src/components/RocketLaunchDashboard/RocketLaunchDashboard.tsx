import React, { ChangeEvent, FormEvent, useState } from "react";

import "./RocketLaunchDashboard.css";
import { State } from "../../hooks/use-service.types";
import PlotLaunches from "../PlotLaunches/PlotLaunches";
import useService from "../../hooks/useService";

const baseURl = "https://lldev.thespacedevs.com/2.2.0/launch/";

const ListRocketLaunch: React.FC = (): JSX.Element => {
  const dateNow = new Date();
  const [dates, setDates] = useState({
    start: dateNow.toISOString(),
    end: new Date(dateNow.setMonth(dateNow.getMonth() + 3)).toISOString(),
  });
  const defaultSearch = `${baseURl}?last_updated__gte=&last_updated__lte=&limit=10&mission__orbit__name=&mission__orbit__name__icontains=&name=&net__gt=&net__gte=&net__lt=&net__lte=&r_spacex_api_id=&rocket__configuration__full_name=&rocket__configuration__full_name__icontains=&rocket__configuration__id=&rocket__configuration__manufacturer__name=&rocket__configuration__manufacturer__name__icontains=&rocket__configuration__name=&rocket__spacecraftflight__spacecraft__id=&rocket__spacecraftflight__spacecraft__name=&rocket__spacecraftflight__spacecraft__name__icontains=&slug=&status=&window_end__gt=&window_end__gte=&window_end__lt=&window_end__lte=${dates.end}&window_start__gt=&window_start__gte=${dates.start}&window_start__lt=&window_start__lte=`;

  const [searchURL, setSearchURl] = useState(defaultSearch);
  const { state, data } = useService(searchURL);
  let { results, previous, next } = data || {};

  const previousClick = (): void => {
    if (previous) {
      setSearchURl(previous);
    }
  };

  const nextClick = (): void => {
    if (next) {
      setSearchURl(next);
    }
  };

  const dateInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value = new Date().toString() } = e.target;
    const isoStringVal = new Date(value).toISOString();
    if (name === "start") {
      setDates({ ...dates, start: isoStringVal });
    } else {
      setDates({ ...dates, end: isoStringVal });
    }
  };

  const searchClickHandler = (e: FormEvent) => {
    e.preventDefault();
    setSearchURl(
      `${baseURl}?last_updated__gte=&last_updated__lte=&limit=10&mission__orbit__name=&mission__orbit__name__icontains=&name=&net__gt=&net__gte=&net__lt=&net__lte=&r_spacex_api_id=&rocket__configuration__full_name=&rocket__configuration__full_name__icontains=&rocket__configuration__id=&rocket__configuration__manufacturer__name=&rocket__configuration__manufacturer__name__icontains=&rocket__configuration__name=&rocket__spacecraftflight__spacecraft__id=&rocket__spacecraftflight__spacecraft__name=&rocket__spacecraftflight__spacecraft__name__icontains=&slug=&status=&window_end__gt=&window_end__gte=&window_end__lt=&window_end__lte=${dates.end}&window_start__gt=&window_start__gte=${dates.start}&window_start__lt=&window_start__lte=`
    );
  };

  return (
    <div className="launchContainer">
      <div className="form">
        <label>
          Start date:
          <input type="date" name="start" onBlur={dateInputChangeHandler} />
        </label>
        <label>
          End date:
          <input type="date" name="end" onBlur={dateInputChangeHandler} />
        </label>
        <input
          type="button"
          className="btn"
          value="Search"
          onClick={searchClickHandler}
        />
        <span data-testid="totalLaunches">
          Total Launches: {data?.count || 0}
        </span>
      </div>
      <br />
      {state === State.LOADING ? (
        <div className="center">{"Loading result..."}</div>
      ) : state === State.SUCCESS ? (
        <>
          <PlotLaunches>{results}</PlotLaunches>
          <div className="btnGrp">
            <input
              type="button"
              className="btn"
              value="Previous"
              data-testid="previous"
              disabled={!previous}
              onClick={previousClick}
            />
            <input
              type="button"
              className="btn"
              value="Next"
              data-testid="next"
              disabled={!next}
              onClick={nextClick}
            />
          </div>
        </>
      ) : (
        <div className="center">Something went wrong.</div>
      )}
    </div>
  );
};

export default ListRocketLaunch;
