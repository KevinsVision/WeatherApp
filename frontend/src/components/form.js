import React from "react";

const Form = props => {
  const handleSubmit = e => {
    e.preventDefault();
    const city = e.target.elements.city.value.toLowerCase();
    const country = e.target.elements.country.value.toLowerCase();
    props.getWeather(city, country);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="city" placeholder="City..." />
      <input type="text" name="country" placeholder="Country..." />
      <button>Get Weather</button>
    </form>
  );
};
export default Form;
