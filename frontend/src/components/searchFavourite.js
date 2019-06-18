import React from "react";

const SearchFavourite = props => {
  const handleChange = e => {
    const [city, country] = e.target.value.split(",");
    props.getWeather(city, country);
  };
  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <select className="custom-select" onChange={handleChange} name="select">
      <option value="" disabled selected>
        {props.defaultText}
      </option>
      {props.array.slice(0, 5).map((location, index) => (
        <option
          key={index}
          value={`${capitalizeFirstLetter(
            location.city
          )},${capitalizeFirstLetter(location.country)}`}
        >
          {capitalizeFirstLetter(location.city)},{" "}
          {capitalizeFirstLetter(location.country)}
        </option>
      ))}
    </select>
  );
};

export default React.memo(SearchFavourite);
