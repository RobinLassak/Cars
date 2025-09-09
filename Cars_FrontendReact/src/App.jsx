import { useState, useEffect } from "react";
import "./App.css";
import CarTable from "./components/carTable/CarTable";
import FilterForm from "./components/FilterForm/FilterForm";
import UniForm from "./components/UniForm/UniForm";
import axios from "axios";

function App() {
  const [cars, setCars] = useState([]);
  const [carsToShow, setCarsToShow] = useState([]);
  const [newCar, setNewCar] = useState({
    brand: "",
    model: "",
    reg: "",
    km: 0, // Nastavení výchozí hodnoty jako 0
    year: 0, // Nastavení výchozí hodnoty jako 0
  });

  //Ziskame data z backendu pomoci AXIOS
  const getCars = () => {
    const apiUrl = import.meta.env.DEV ? "/api" : "/Cars-BackendPHP";
    axios
      .get(`${apiUrl}/?action=getAll`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCars(response.data);
          setCarsToShow(response.data);
        } else {
          console.error("Odpoved neni pole");
        }
      })
      .catch((error) => {
        alert(`Chyba: ${error}`);
      });
  };

  useEffect(() => {
    getCars();
  }, []);

  //Filtrovani aut pomoci ID
  const filterCars = (ids) => {
    //http://localhost/api/?action=getSpec&ids=5,7,8

    const param = ids.join();
    const apiUrl = import.meta.env.DEV ? "/api" : "/Cars-BackendPHP";
    axios
      .get(
        `${apiUrl}/?action=getSpec&ids=${param}`
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCarsToShow(response.data);
        } else {
          console.error("Odpoved neni pole");
        }
      })
      .catch((error) => {
        alert(`Chyba: ${error}`);
      });
  };

  //Vymazani auta
  const deleteCar = (id) => {
    const apiUrl = import.meta.env.DEV ? "/api" : "/Cars-BackendPHP";
    axios
      .delete(`${apiUrl}/${id}`)
      .then((response) => {
        console.log(response.data);
        getCars();
        alert("Auto úspěšně smazáno.");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  //Pridani noveho auta
  const insertCar = (car) => {
    const apiUrl = import.meta.env.DEV ? "/api" : "/Cars-BackendPHP";
    axios
      .post(`${apiUrl}/`, car)
      .then((response) => {
        console.log(response.data);
        getCars();
        alert("Auto uspesne pridano.");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert(`Chyba: ${error}`);
      });
  };

  //Uprava auta
  const updateCar = (car) => {
    const apiUrl = import.meta.env.DEV ? "/api" : "/Cars-BackendPHP";
    axios
      .put(`${apiUrl}/`, car)
      .then((response) => {
        console.log(response.data);
        getCars();
        alert("Auto uspesne aktualizovano.");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert(`Chyba: ${error}`);
      });
  };

  const [carToChange, setCarToChange] = useState({
    id: 0,
    brand: "",
    model: "",
    reg: "",
    km: 0,
    year: 0,
  });

  // Zpracování nových dat z formuláře
  const handleNewData = (updatedCar, source) => {
    switch (source) {
      case "add-car-form": {
        setNewCar(updatedCar);
        break;
      }
      case "change-car-form": {
        setCarToChange(updatedCar);
        break;
      }
      default:
        break;
    }
  };

  // Odeslání nových nebo upravených dat
  const handleUpdate = (source) => {
    switch (source) {
      case "add-car-form": {
        insertCar(newCar);
        // Resetování formuláře pro nové auto
        setNewCar({
          brand: "",
          model: "",
          reg: "",
          km: 0,
          year: 0,
        });
        break;
      }
      case "change-car-form": {
        updateCar(carToChange);
        setCarToChange({
          id: 0,
          brand: "",
          model: "",
          reg: "",
          km: 0,
          year: 0,
        });
        break;
      }
      default:
        break;
    }
  };

  // Výběr auta k úpravě
  const handleChange = (idToChange) => {
    const selectedCar = cars.find((car) => car.id === idToChange);
    if (selectedCar) {
      setCarToChange(selectedCar);
    }
  };

  // Odstranění auta
  const handleDelete = (idToDelete) => {
    deleteCar(idToDelete);
  };

  // Filtrování aut
  const handleFilterData = (filteredCars) => {
    const ids = filteredCars.map((car) => car.id);
    filterCars(ids);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <FilterForm data={cars} handleFilterData={handleFilterData} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <CarTable
            data={carsToShow}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12 my-2">
          <h2>Přidání nového auta</h2>
          <UniForm
            id="add-car-form"
            data={newCar} // Přidáno předání dat formuláři
            handleNewData={handleNewData}
            handleUpdate={handleUpdate}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12 my-2">
          <h2>Úprava auta</h2>
          <UniForm
            id="change-car-form"
            data={carToChange} // Přidáno předání dat formuláři
            handleNewData={handleNewData}
            handleUpdate={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
