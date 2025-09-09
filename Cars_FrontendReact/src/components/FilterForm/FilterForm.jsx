import React, { useEffect, useState } from "react";

function FilterForm({ data, handleFilterData }) {
  const [brands, setBrands] = useState([]);
  const [selBrands, setSelBrands] = useState([]);
  const [selReg, setSelReg] = useState("");
  const [criteria, setCriteria] = useState("brand");

  useEffect(() => {
    setBrands(Array.from(new Set(data.map((car) => car.brand))));
  }, [data]);

  const handleCriteria = (e) => {
    setCriteria(e.target.value);
  };

  const handleReset = () => {
    setSelBrands([]);
    setSelReg("");
    handleFilterData(data); // Reset na původní data
  };

  const handleFilter = () => {
    let filtered = data; // Inicializace se všemi auty

    if (criteria === "brand" && selBrands.length > 0) {
      filtered = data.filter((car) => selBrands.includes(car.brand));
    } else if (criteria === "reg" && selReg) {
      filtered = data.filter((car) => car.reg === selReg);
    }

    handleFilterData(filtered); // Předej filtrovaná data zpět do App.js
  };

  const handleChange = (e) => {
    const name = e.target.name;
    switch (name) {
      case "brand": {
        const tempBrands = Array.from(e.target.selectedOptions).map(
          (option) => option.value
        );
        setSelBrands(tempBrands);
        break;
      }
      case "reg": {
        setSelReg(e.target.value);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div>
      <fieldset>
        <legend>Filtr vyhledávání</legend>
        <div>
          <select
            className="form-select form-select-sm mb-3"
            disabled={criteria !== "brand"} // Opravená podmínka
            name="brand"
            id="brand"
            multiple
            value={selBrands}
            onChange={handleChange}
          >
            {brands.map((brand) => (
              <option key={brand}>{brand}</option>
            ))}
          </select>
        </div>
        <div>
          <input
            className="form-control"
            disabled={criteria !== "reg"} // Opravená podmínka
            type="text"
            name="reg"
            id="reg"
            value={selReg}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className="form-check-input"
            type="radio"
            name="filter-criteria"
            id="brand-criteria"
            value="brand"
            checked={criteria === "brand"}
            onChange={handleCriteria}
          />{" "}
          Vyhledat podle typu vozu
        </div>
        <div>
          <input
            className="form-check-input"
            type="radio"
            name="filter-criteria"
            id="reg-criteria"
            value="reg"
            checked={criteria === "reg"}
            onChange={handleCriteria}
          />{" "}
          Vyhledat podle registrační značky
        </div>
        <div className="py-3">
          <button className="btn btn-warning" onClick={handleFilter}>
            Filter
          </button>
          <button className="btn btn-danger mx-1" onClick={handleReset}>
            Reset
          </button>
        </div>
      </fieldset>
    </div>
  );
}

export default FilterForm;
