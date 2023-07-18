import "./customButton.style.scss";

import React from "react";

interface Iprops {
  btnName: string;
  btnEvent?: any;
  btnClsName?: string;
}
const CustomButton: React.FC<Iprops> = ({ btnName, btnEvent, btnClsName }) => {
  return (
    <button className={`${btnClsName}`} onClick={() => btnEvent()}>
      {btnName}
    </button>
  );
};

export default CustomButton;
