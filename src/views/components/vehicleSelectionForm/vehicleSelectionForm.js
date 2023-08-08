import React, { useState, useEffect } from "react";
import { MODELS } from "../../../data/vehicleList";
import { changeWordToTitleCase } from "../../helper/stringCasing.js";
import "./vehicleSelectionForm.css";

const VehicleSelectionForm = () => {
  const [vehicleMakeOptionList, setVehicleMakeOptionList] = useState([]);
  const [vehicleModelOptionList, setVehicleModelOptionList] = useState([]);
  const [vehicleBadgeOptionList, setVehicleBadgeOptionList] = useState([]);
  const [commonVehicleList, setCommonVehicleList] = useState([]);

  let [vehicleMakeOption, setVehicleMakeOption] = useState("");
  let [vehicleModelOption, setVehicleModelOption] = useState("");
  let [vehicleBadgeOption, setVehicleBadgeOption] = useState("");

  useEffect(() => {
    loadVehicleMake();
    loadCommonVehicles();
  }, []);

  useEffect(() => {
    if (vehicleMakeOption) {
      const models = Object.keys(MODELS[vehicleMakeOption]);
      setVehicleModelOptionList(models);
    }
  }, [vehicleMakeOption]);

  useEffect(() => {
    if (vehicleModelOption) {
      const badgeList = MODELS[vehicleMakeOption][vehicleModelOption];
      setVehicleBadgeOptionList(badgeList);
    }
  }, [vehicleModelOption, vehicleMakeOption]);

  const loadVehicleMake = () => {
    const makes = Object.keys(MODELS);
    setVehicleMakeOptionList(makes);
  };

  const loadCommonVehicles = () => {
    const commonVehicleDetails = [];
    Object.entries(MODELS).forEach(([key, value]) => {
      let newObj = {};
      newObj["vehicleMake"] = key;
      newObj["vehicleModel"] = Object.keys(value)[0];
      newObj["vehicleBadge"] = MODELS[key][Object.keys(value)[0]][0];
      commonVehicleDetails.push(newObj);
    });

    setCommonVehicleList(commonVehicleDetails);
  };

  const onChangeVehicleMake = (e) => {
    setVehicleModelOptionList([]);
    setVehicleBadgeOptionList([]);
    setVehicleModelOption("");
    setVehicleBadgeOption("");

    setVehicleMakeOption(e.target.value);
  };

  const onChangeVehicleModel = (e) => {
    setVehicleBadgeOptionList([]);
    setVehicleBadgeOption("");

    setVehicleModelOption(e.target.value);
  };

  const onChangeVehicleBadge = (e) => {
    setVehicleBadgeOption(e.target.value);
  };

  const populateVehicleForm = (commonVehicle) => () => {
    setVehicleMakeOption(commonVehicle.vehicleMake);
    setVehicleModelOption(commonVehicle.vehicleModel);
    setVehicleBadgeOption(commonVehicle.vehicleBadge);
  };

  return (
    <div id="vehicle-selection-container">
      <form
        action="http://localhost:4000/upload"
        encType="multipart/form-data"
        id="vehicle-selection-form"
        method="post"
        name="vehicle-selection-form"
        target="_self"
      >
        <h1 id="form-title">Drill Down Form</h1>
        <div className="form-inline" id="vehicle-make-container">
          {/* <label htmlFor="vehicle-make">Choose a vehicle make:</label> */}
          <select
            form="vehicle-selection-form"
            id="vehicle-make"
            name="make"
            onChange={onChangeVehicleMake}
            value={vehicleMakeOption}
          >
            <option disabled value="">
              Please choose a vehicle make
            </option>
            ;
            {vehicleMakeOptionList.map((option, index) => (
              <option key={index} value={option}>
                {changeWordToTitleCase(option)}
              </option>
            ))}
          </select>
        </div>

        {vehicleMakeOption ? (
          <div className="form-inline" id="vehicle-model-container">
            {/* <label htmlFor="vehicle-model">Choose a vehicle model:</label> */}
            <select
              form="vehicle-selection-form"
              id="vehicle-model"
              name="model"
              onChange={onChangeVehicleModel}
              value={vehicleModelOption}
            >
              <option disabled value="">
                Please choose a vehicle model
              </option>
              ;
              {vehicleModelOptionList.map((option, index) => (
                <option key={index} value={option}>
                  {changeWordToTitleCase(option)}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        {vehicleModelOption ? (
          <div className="form-inline" id="vehicle-badge-container">
            {/* <label htmlFor="vehicle-badge">Choose a vehicle badge:</label> */}
            <select
              form="vehicle-selection-form"
              id="vehicle-badge"
              name="badge"
              onChange={onChangeVehicleBadge}
              value={vehicleBadgeOption}
            >
              <option disabled value="">
                Please choose a vehicle badge
              </option>
              ;
              {vehicleBadgeOptionList.map((option, index) => (
                <option key={index} value={option}>
                  {changeWordToTitleCase(option)}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        {vehicleBadgeOption ? (
          <div>
            <div className="form-inline" id="logbook-upload-container">
              <label htmlFor="logbook-upload-btn">Upload Logbook:</label>
              <input
                accept=".txt"
                className="btn"
                id="logbook-upload-btn"
                name="logbookUpload"
                type="file"
              />
            </div>
            <div className="form-inline">
              <input
                className="btn"
                id="submit-btn"
                type="submit"
                value="Submit"
              />
            </div>
          </div>
        ) : null}
      </form>

      <h2>Select a Vehicle</h2>
      {commonVehicleList.map((commonVehicle, index) => (
        <div className="form-inline">
          <button key={index} onClick={populateVehicleForm(commonVehicle)}>
            {changeWordToTitleCase(commonVehicle.vehicleMake)}{" "}
            {commonVehicle.vehicleModel} {commonVehicle.vehicleBadge}
          </button>
        </div>
      ))}
    </div>
  );
};

export default VehicleSelectionForm;
