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
      <option disabled selected>
        {props.defaultText}
      </option>
      {props.array.slice(0, 5).map((location, index) => {
        const capitalizedCity = capitalizeFirstLetter(location.city);
        const capitalizedCountry = capitalizeFirstLetter(location.country);
        return (
          <option
            key={index}
            value={`${capitalizedCity},${capitalizedCountry}`}
          >
            {capitalizedCity}, {capitalizedCountry}
          </option>
        );
      })}
    </select>
  );
};

export default React.memo(SearchFavourite);
