import React from "react";
import Form from "./form";
import Welcome from "./welcome";
import Weather from "./weather";
import SearchFavourite from "./searchFavourite";

class HomePage extends React.Component {
  state = {
    temperature: null,
    city: null,
    country: null,
    humidity: null,
    description: null,
    error: null,
    searches: [],
    favourites: []
  };

  postSearch = (city, country) => {
    const search = {
      city: city.toLowerCase(),
      country: country.toLowerCase(),
      user_id: this.props.user.id
    };
    if (
      this.state.searches.filter(
        search =>
          search.city === city.toLowerCase() &&
          search.country === country.toLowerCase() &&
          search.user_id === this.props.user.id
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
          this.setState({ searches: [newSearch, ...this.state.searches] });
        });
    }
  };

  postFavourite = (city, country) => {
    const favourite = {
      city: city.toLowerCase(),
      country: country.toLowerCase(),
      user_id: this.props.user.id
    };
    if (
      this.state.favourites.filter(
        favourite =>
          favourite.city === city.toLowerCase() &&
          favourite.country === country.toLowerCase() &&
          favourite.user_id === this.props.user.id
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
          this.setState({
            favourites: [newfavourite, ...this.state.favourites]
          });
        });
    }
  };

  deleteFavourite = favouriteToDelete => {
    const NewFavouriteArray = this.state.favourites.filter(
      favourite => favourite !== favouriteToDelete
    );
    return fetch(
      `http://localhost:3000/favouritecities/${favouriteToDelete.id}`,
      {
        method: "DELETE"
      }
    ).then(this.setState({ favourites: NewFavouriteArray }));
  };

  componentDidMount() {
    if (this.props.user === null) {
      this.props.history.push("/login");
    } else {
      fetch(`http://localhost:3000/searchcities`)
        .then(resp => resp.json())
        .then(searches => this.setState({ searches: searches.reverse() }));
      fetch(`http://localhost:3000/favouritecities`)
        .then(resp => resp.json())
        .then(favourites =>
          this.setState({ favourites: favourites.reverse() })
        );
    }
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
    // const { username } = this.props.user;
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Welcome 
                  // username={username} 
                  />
                </div>
                <div className="col-xs-7 form-container">
                  <SearchFavourite
                    array={this.state.searches}
                    getWeather={this.getWeather}
                    defaultText="Previous Searches"
                  />
                  <Form getWeather={this.getWeather} />
                  <SearchFavourite
                    array={this.state.favourites}
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
                    deleteFavourite={this.deleteFavourite}
                    favourites={this.state.favourites}
                    user={this.props.user}
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
export default HomePage;
