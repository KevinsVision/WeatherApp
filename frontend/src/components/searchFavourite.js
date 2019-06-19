import React from "react";

class SearchFavourite extends React.Component {
  state = {
    selected: ""
  };

  handleChange = e => {
    const [city, country] = e.target.value.split(",");
    this.props.getWeather(city, country);
  };

  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    return (
      <select
        className="custom-select"
        onChange={this.handleChange}
        value={this.state.selected}
        name="select"
      >
        <option value="" disabled selected>
          {this.props.defaultText}
        </option>
        {this.props.array.slice(0, 5).map((location, index) => {
          const capitalizedCity = this.capitalizeFirstLetter(location.city);
          const capitalizedCountry = this.capitalizeFirstLetter(
            location.country
          );
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
  }
}

export default React.memo(SearchFavourite);
