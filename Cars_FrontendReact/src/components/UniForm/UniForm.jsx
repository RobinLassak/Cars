import React from "react";

function UniForm({ id, data, handleNewData, handleUpdate }) {
  const handleChange = (e) => {
    let temp = { ...data };
    switch (e.target.name) {
      case `${id}-brand`: {
        temp.brand = e.target.value;
        break;
      }
      case `${id}-model`: {
        temp.model = e.target.value;
        break;
      }
      case `${id}-reg`: {
        temp.reg = e.target.value;
        break;
      }
      case `${id}-km`: {
        temp.km = parseInt(e.target.value);
        break;
      }
      case `${id}-year`: {
        temp.year = parseInt(e.target.value);
        break;
      }
    }
    handleNewData(temp, id);
  };

  return (
    <div className="container py-2" id={id}>
      <div className="mb-2">
        <label className="form-label" htmlFor={`${id}-brand`}>
          Znacka
        </label>
        <input
          className="form-control"
          type="text"
          name={`${id}-brand`}
          id={`${id}-brand`}
          value={data.brand}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label" htmlFor={`${id}-model`}>
          Model
        </label>
        <input
          className="form-control"
          type="text"
          name={`${id}-model`}
          id={`${id}-model`}
          value={data.model}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label" htmlFor={`${id}-reg`}>
          Registracni Znacka
        </label>
        <input
          className="form-control"
          type="text"
          name={`${id}-reg`}
          id={`${id}-reg`}
          value={data.reg}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label" htmlFor={`${id}-km`}>
          Najeto Km
        </label>
        <input
          className="form-control"
          type="number"
          name={`${id}-km`}
          id={`${id}-km`}
          value={data.km}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label" htmlFor={`${id}-year`}>
          Rok vyroby
        </label>
        <input
          className="form-control"
          type="number"
          name={`${id}-year`}
          id={`${id}-year`}
          value={data.year}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <button className="btn btn-warning" onClick={() => handleUpdate(id)}>
          Odesli data
        </button>
      </div>
    </div>
  );
}

export default UniForm;
