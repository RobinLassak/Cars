import React from "react";
import "./CarTable.css";

function CarTable({ data, handleChange, handleDelete }) {
  if (data.length === 0 || data === null || data === undefined) {
    return <p>Zadna data k zobrazeni</p>;
  }
  return (
    <div className="table-responsive">
      <table className="table table-success table-striped text-center my-5">
        <thead>
          <tr>
            <th>Znacka</th>
            <th>Model</th>
            <th>Reg. Znacka</th>
            <th>Najeto km</th>
            <th>Rok vyroby</th>
            <th colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {data.map((car) => (
            <tr key={car.id}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.reg}</td>
              <td>{car.km}</td>
              <td>{car.year}</td>
              <td>
                <div className="d-flex gap-1">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleChange(car.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(car.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CarTable;
