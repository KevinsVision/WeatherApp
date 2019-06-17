import React from "react";
import Form from "./components/form";
import Welcome from "./components/welcome";
import Weather from "./components/weather";
import Search from "./components/search";

class App extends React.Component {
  state = {
    temperature: null,
    city: null,
    country: null,
    humidity: null,
    description: null,
    error: null,
    search: null
  };

  PostSearch = (city, country) => {
    const search = {
      citysearch: city.toLowerCase(),
      countrysesrch: country.toLowerCase()
    };
    if (
      this.state.search.filter(
        search =>
          search.citysearch === city.toLowerCase() &&
          search.countrysesrch === country.toLowerCase()
      ).length > 0
    ) {
      return null;
    } else {
      fetch("http://localhost:3000/searchcities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(search)
      })
        .then(resp => resp.json())
        .then(newSearch => {
          debugger;
          this.setState({ search: [...newSearch, this.state.search] });
        });
    }
  };

  componentDidMount() {
    fetch(`http://localhost:3000/searchcities`)
      .then(resp => resp.json())
      .then(searches => this.setState({ search: searches.reverse() }));
  }

  getWeather = e => {
    e.preventDefault();
    const city = e.target.elements.city.value.toLowerCase();
    const country = e.target.elements.country.value.toLowerCase();
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=cdce26b8335ca17210a83d32bec597e0`
    )
      .then(resp => resp.json())
      .then(resp => {
        if (city && country) {
          this.setState(
            {
              temperature: resp.main.temp,
              city: resp.name,
              country: resp.sys.country,
              humidity: resp.main.humidity,
              description: resp.weather[0].description,
              error: ""
            },
            () => {
              this.PostSearch(city, country);
            }
          );
        } else {
          this.setState({
            error: "Please enter the values..."
          });
        }
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Welcome />
                </div>
                <div className="col-xs-7 form-container">
                  <Search />
                  <Form loadWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
