import { useState } from "react";
import "./styles/weatherStyles.css";

const WheatherApp = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "605507acf87117e111e54a3ab5238541";

  const kelvin = 273.15;

  {
    /*se utiliza useState para ir cambiando en cuanto a las 
diferentes ciudades que se vallan introduciendo, 
actualizandose por medio del metodo setCiudad */
  }
  const [ciudad, setCiudad] = useState("");

  {
    /**se usa otro estado para obtener los datos,
  de la api */
  }
  const [dataClima, setDataClima] = useState(null);

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      /**se evalua que el campo de ciudad no se encuentre vacio */
    }
    if (ciudad.length > 0) fetchClima();
  };

  {
    /**se realiza una peticion fetch a la api */
  }
  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
      const data = await response.json();
      setDataClima(data);
    } catch (error) {
      console.error("ocurrio algun problema");
    }
  };

  return (
    <>
      <h1>Aplicacion del Clima</h1>
      <form className="container" onSubmit={handleSubmit}>
        <input type="text" value={ciudad} onChange={handleCambioCiudad} />
        <button type="submit">Buscar</button>
      </form>
      {dataClima && (
        <div>
          <h2>{dataClima.name}</h2>
          <p>Temperatura: {parseInt(dataClima?.main?.temp - kelvin)}ºC</p>
          <p>Condición Meteorologica: {dataClima.weather[0].description} </p>
          <img
            className={"foto"}
            src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default WheatherApp;
