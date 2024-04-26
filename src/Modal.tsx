import { useForm, SubmitHandler } from "react-hook-form";
import { Car } from "./Vehicle";
import { useEffect } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Inputs = {
  name: string;
  model: string;
  price: number;
};

const schema = yup.object({
    name: yup.string().required(),
    model: yup.string().required(),
    price: yup.number().positive().integer().required(),
}).required();

const Modal = ({
  setEdit,
  car,
  vehicles,
  setVehicles,
}: {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  car: Car;
  vehicles: Car[];
  setVehicles: React.Dispatch<React.SetStateAction<Car[]>>;
}) => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setVehicles(vehicles.slice().map((el) => {
        if (el.id === car.id) {
            return { ...el, ...data }
        }
        return el;
    }))
    setEdit(false);
  };

  useEffect(() => {
    setFocus('name')
  },[setFocus]);

  const pathToLogoClose = process.env.PUBLIC_URL + "close.svg";

  return (
    <div className="modal">
      <div className="modal-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Редактор машины</h2>
          <div>
            <p>Модель</p>
            <input defaultValue={car.name} {...register("name", {required: true})} placeholder="Марка"/>
            <p>{errors.name?.message}</p>
          </div>
          <div>
            <p>Марка</p>
            <input defaultValue={car.model} {...register("model", { required: true })} placeholder="Модель"/>
            <p>{errors.model?.message}</p>
          </div>
          <div>
            <p>Цена</p>
            <input defaultValue={car.price} {...register("price", { required: true })} placeholder="Цена"/>
            {errors.price && <p>Нужны цифры</p>}
          </div>
          <input type="submit" value='Сохранить'/>
        </form>
      </div>
      <div className="close" onClick={() => setEdit(false)}>
        <img src={pathToLogoClose} alt="" />
      </div>
    </div>
  );
};

export default Modal;
