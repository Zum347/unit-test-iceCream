import React, { useState } from "react";

const Form = () => {
  const [isHover, setIsHover] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="my-4 mt-5 d-flex gap-3 justify-content-center align-items-center">
      <input
        className="form-check-input"
        id="terms"
        type="checkbox"
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <div className="terms-box">
        <p style={{ visibility: isHover ? "visible" : "hidden" }}>
          Size gerçekten bir şey teslim etmeyeceğiz.
        </p>
        <label className={isChecked ? "" : "opacity-75"} htmlFor="terms">
          Koşulları okudum ve kabul ediyorum.
        </label>
      </div>
      <button
        disabled={!isChecked}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="btn btn-primary"
      >
        Siparişi Onayla
      </button>
    </div>
  );
};

export default Form;