import React from "react";

const Card = ({ data, basket, setBasket }) => {
  const found = basket.filter((item) => item.name == data.name);
  const handleReset = () => {
    setBasket(basket.filter((item) => item.name !== data.name));
  };
  return (
    <div
      className="d-flex flex-column align-items-center gap-2 border rounded p-3 w-25"
      style={{ width: "150px" }}
    >
      <img height={100} src={data.imagePath} alt="çeşit-resmi" />
      <span className="text-nowrap fs-5 fw-bold">{data.name}</span>
      <div className="mt-4 d-flex justify-content-center align-items-center ">
        <button onClick={handleReset} className="btn btn-outline-danger">
          Sıfırla
        </button>
        <button className="btn text-white fs-5">
          <span>{found.length}</span>
        </button>
        <button
          onClick={() => setBasket([...basket, data])}
          className="btn btn-outline-success"
        >
          Ekle
        </button>
      </div>
    </div>
  );
};

export default Card;