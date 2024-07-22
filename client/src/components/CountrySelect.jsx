import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import "../styles/CountrySelect.css";

function CountrySelect() {
  const [value, setValue] = useState({ value: "US", label: "United States" });
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };

  return (
    <Select
      options={options}
      value={value}
      onChange={changeHandler}
      classNamePrefix="react-select"
    />
  );
}

export default CountrySelect;
