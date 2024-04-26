import React, { useState } from "react";
import Modal from "./Modal";
import { LngLat } from "@yandex/ymaps3-types";

export type Car = {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude: number;
  longitude: number;
  [index: string]: string | number;
};

const Vehicle = ({ car, vehicles, setVehicles, setLocationForMap } : {
  car: Car;
  vehicles: Car[];
  setVehicles: React.Dispatch<React.SetStateAction<Car[]>>;
  setLocationForMap: React.Dispatch<React.SetStateAction<LngLat>>}) => {

  const pathToLogoDelete = process.env.PUBLIC_URL + "delete.svg";
  const pathToLogoEdit = process.env.PUBLIC_URL + "edit.svg";
  const pathToLogoPosition = process.env.PUBLIC_URL + "location.svg"
  const [edit, setEdit] = useState<boolean>(false);

  const handleEdit = () => {
    setEdit(true);
  }

  return (
    <>
      <div className="card">
        <div className="card-left">
          <div className="name">
            {car.name} {car.model} {car.year}
          </div>
          <div className="price">{car.price}$</div>
          <div
            className="color"
            style={{ backgroundColor: `${car.color}` }}
          ></div>
        </div>
        <div className="buttons">
          <button
            className="delete"
            onClick={() =>
              setVehicles(vehicles.slice().filter((el) => el.id !== car.id))
            }
          >
            <img src={pathToLogoDelete} alt="" />
          </button>
          <button className="edit" onClick={handleEdit}>
            <img src={pathToLogoEdit} alt="" />
          </button>
          <button className="position" onClick={() => setLocationForMap([car.longitude, car.latitude])}>
            <img src={pathToLogoPosition} alt="" />
          </button>
        </div>
      </div>
      {edit ? <Modal setEdit={setEdit} car={car} vehicles={vehicles} setVehicles={setVehicles}/> : null}
    </>
  );
};

export default Vehicle;
