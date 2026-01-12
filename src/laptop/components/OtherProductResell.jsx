import { useState } from "react";
import ResellForm from "./ResellForm";

const OtherProductResell = () => {
  const [showProductForm, setShowProductForm] = useState(false);

  return (
    <>
      {!showProductForm ? (
        <div className="laptop-cusResellOther">
          <h4>Want to sell some other product?</h4>
          <button onClick={() => setShowProductForm(true)}>
            Click here
          </button>
        </div>
      ) : (
        <ResellForm handleCancel={() => setShowProductForm(false)} />
      )}
    </>
  );
};

export default OtherProductResell;
