import { useEffect, useState } from "react";
import "./App.css";
import Vehicle, { Car } from "./Vehicle";
import React from "react";
import ReactDOM from "react-dom";
import Sort from "./Sort";
import { LngLat } from "@yandex/ymaps3-types";



const ymaps3Reactify = await ymaps3.import("@yandex/ymaps3-reactify");
const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM);
const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapControls } =
  reactify.module(ymaps3);

const {YMapZoomControl} = reactify.module(await ymaps3.import('@yandex/ymaps3-controls@0.0.1'));

const App = () => {
  const [vehicles, setVenicles] = useState<Car[]>([]);
  const url: string = "https://test.tspb.su/test-task/vehicles";

  useEffect(() => {
    
      fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((data) => setVenicles(data))
      .catch((e) => console.error(e));
    
  }, []);

  const [locationForMap, setLocationForMap] = useState<LngLat>([30.315147, 59.939332]);

  return (
    <div className="App">
      <Sort vehicles={vehicles} setVehicles={setVenicles}/>
      {vehicles.map((el, index) => (
        <Vehicle car={el} key={index} vehicles={vehicles} setVehicles={setVenicles} setLocationForMap={setLocationForMap}/>
      ))}
      <YMap
        location={{ center: locationForMap, zoom: 14 }}
        mode="vector"
      >
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        <YMapControls position="right bottom"> 
         <YMapZoomControl />
        </YMapControls> 
        

        {vehicles.map((veh) => {
          return (
            <YMapMarker coordinates={[veh.longitude, veh.latitude]} key={veh.id}>
              <div className="car-on-map" style={ {backgroundColor: `${veh.color}`, color: `${veh.color === 'black' || 
              veh.color === 'silver' ||
              veh.color === 'blue' ? 'white ' : 'black'}`}}>{veh.name.slice(0,1)}{veh.model.slice(0,1)}</div>
              <div className="hide-car">{veh.name} {veh.model} {veh.year}</div>
          </YMapMarker>
          )
        })}

      </YMap>
    </div>
  );
};

export default App;
