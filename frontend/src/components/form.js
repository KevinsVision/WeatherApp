import React from "react";

const initialState = {
  city: "",
  country: ""
};
class Form extends React.Component {
  state = initialState;

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    const { city, country } = this.state;

    this.props.getWeather(city, country);
    this.setState(initialState);
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { city, country } = this.state;

    return (
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="city"
          placeholder="City..."
          value={city}
        />
        <input
          onChange={handleChange}
          type="text"
          name="country"
          placeholder="Country..."
          value={country}
        />
        <button>Get Weather</button>
      </form>
    );
  }
}
export default Form;
