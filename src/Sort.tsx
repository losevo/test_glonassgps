import { useState } from "react";
import { Car } from "./Vehicle";

interface Map {
    [index: string]: () => void,
}

const Sort = ({
  vehicles,
  setVehicles,
}: {
  vehicles: Car[];
  setVehicles: React.Dispatch<React.SetStateAction<Car[]>>;
}) => {
  const [sortYear, setSortYear] = useState(true);
  const [sortPrice, setSortPrice] = useState(false);

  const handleSort = (method: string): void => {
    const div = document.querySelector(`.sort-${method}`);
    const methodForMap = `${method}`;
    const map: Map = {
        year: () => sortYear ? up(method) : down(method),
        price: () => sortPrice ? up(method) : down(method),
    };

    const up = (sort: string): void => {
      setVehicles(vehicles.slice().sort((a, b) => +a[method] - +b[method]));
      div?.classList.remove("up");
      div?.classList.add("down");
      if (sort === 'year') setSortYear(!sortYear);
      if (sort === 'price') setSortPrice(!sortPrice);
    };

    const down = (sort: string): void => {
      setVehicles(vehicles.slice().sort((a, b) => +b[method] - +a[method]));
      div?.classList.remove("down");
      div?.classList.add("up");
      if (sort === 'year') setSortYear(!sortYear);
      if (sort === 'price') setSortPrice(!sortPrice);
    };

    return map[methodForMap]();
  };

 
  return (
    <>
      <div className="sort">
        <div>Сортировать по:</div>
        <div className="sort-year up" onClick={() => handleSort("year")}>
          году
        </div>
        <div className="sort-price up" onClick={() => handleSort("price")}>
          стоимости
        </div>
      </div>
    </>
  );
};

export default Sort;
