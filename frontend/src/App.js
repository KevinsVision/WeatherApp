import React from "react";
import Form from "./components/form";
import Welcome from "./components/welcome";
import Weather from "./components/weather";
import SearchFavourite from "./components/searchFavourite";
import { Route } from "react-router-dom";

class App extends React.Component {
  state = {
    temperature: null,
    city: null,
    country: null,
    humidity: null,
    description: null,
    error: null,
    search: [],
    favourite: []
  };

  postSearch = (city, country) => {
    const search = {
      city: city.toLowerCase(),
      country: country.toLowerCase()
    };
    if (
      this.state.search.filter(
        search =>
          search.city === city.toLowerCase() &&
          search.country === country.toLowerCase()
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
          this.setState({ search: [newSearch, ...this.state.search] });
        });
    }
  };

  postFavourite = (city, country) => {
    const favourite = {
      city: city.toLowerCase(),
      country: country.toLowerCase()
    };
    if (
      this.state.favourite.filter(
        favourite =>
          favourite.city === city.toLowerCase() &&
          favourite.country === country.toLowerCase()
      ).length > 0
    ) {
      return null;
    } else {
      fetch("http://localhost:3000/favouritecities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(favourite)
      })
        .then(resp => resp.json())
        .then(newfavourite => {
          this.setState({ favourite: [newfavourite, ...this.state.favourite] });
        });
    }
  };

  componentDidMount() {
    fetch(`http://localhost:3000/searchcities`)
      .then(resp => resp.json())
      .then(searches => this.setState({ search: searches.reverse() }));
    fetch(`http://localhost:3000/favouritecities`)
      .then(resp => resp.json())
      .then(favourite => this.setState({ favourite: favourite.reverse() }));
  }

  getWeather = (city, country) => {
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
              this.postSearch(resp.name, resp.sys.country);
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
                  {/* Added Routes */}
                  <Route exact path="/welcome" component={Welcome} />
                </div>
                <div className="col-xs-7 form-container">
                  <SearchFavourite
                    array={this.state.search}
                    getWeather={this.getWeather}
                    defaultText="Previous Searches"
                  />
                  <Form getWeather={this.getWeather} />
                  <SearchFavourite
                    array={this.state.favourite}
                    getWeather={this.getWeather}
                    defaultText="Favourites"
                  />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                    postFavourite={this.postFavourite}
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
