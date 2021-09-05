import React from "react";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { Launches } from "../../hooks/use-service.types";
import { MapComponent } from "../MapContainer";

interface PlotLaunchesProps {
  children: ReactNode;
}

const PlotLaunches: React.FC<PlotLaunchesProps> = ({ children }) => {
  const [launches, setLaunches] = useState(children);
  const [filterBy, setFilterBy] = useState("agency");
  const [filterInput, setFilterInput] = useState({
    visible: true,
    val: "",
  });
  const changeFilter = (e: ChangeEvent<HTMLSelectElement>): void => {
    setFilterBy(e.target.value);
  };
  const filterSearch = (e: ChangeEvent<HTMLInputElement>): void =>
    setFilterInput({ ...filterInput, val: e.target.value });

  const searchClickHandler = (e: FormEvent): void => {
    e.preventDefault();
    if (filterBy === "agency") {
      setLaunches(
        (launches as Array<Launches>).filter(
          (launch) => launch.pad.agency_id === filterInput.val
        )
      );
    } else if (filterBy === "Success" || filterBy === "Failure") {
      setLaunches(
        (launches as Array<Launches>).filter(
          (launch) => launch.status.abbrev === filterBy
        )
      );
    }
  };
  return (
    <>
      <div className="form">
        <div>
          <label>Filter by:</label>
          <select value={filterBy} onChange={changeFilter}>
            <option value="agency">agency id</option>
            <option value="Success">success</option>
            <option value="Failure">failure</option>
          </select>
          {filterInput.visible && (
            <>
              <label>Id:</label>
              <input type="text" onChange={filterSearch} />
            </>
          )}
          <input
            type="button"
            className="btn"
            value="Search"
            onClick={searchClickHandler}
          />
          <span>
            Launches shown: {((launches as Array<Launches>) || []).length}
          </span>
        </div>
      </div>
      <br />
      <div data-testid="launches">
        <MapComponent>{launches}</MapComponent>
      </div>
    </>
  );
};

export default PlotLaunches;
