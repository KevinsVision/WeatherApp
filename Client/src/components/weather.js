import React from "react";
class Weather extends React.Component {
  isFavourite = () => {
    const { favourites, city, country, user } = this.props;
    return favourites.some(
      favourite =>
        favourite.city.toLowerCase() === city.toLowerCase() &&
        favourite.country.toLowerCase() === country.toLowerCase() &&
        favourite.user_id === user.id
    );
  };

  getFavouite = () => {
    const { favourites, city, country, user } = this.props;
    return favourites.filter(
      favourite =>
        favourite.city === city.toLowerCase() &&
        favourite.country === country.toLowerCase() &&
        favourite.user_id === user.id
    )[0];
  };

  render() {
    return (
      <>
        {this.props.description &&
          (this.isFavourite() ? (
            <button
              className="button"
              onClick={e => this.props.deleteFavourite(this.getFavouite())}
            >
              Remove from Favourites
            </button>
          ) : (
            <button
              className="button"
              onClick={e =>
                this.props.postFavourite(this.props.city, this.props.country)
              }
            >
              Add to Favourites
            </button>
          ))}
        <div className="weather-info">
          {this.props.country && this.props.city && (
            <p className="weather__key">
              Location:
              <span className="weather__value">
                {" "}
                {this.props.city}, {this.props.country}
              </span>
            </p>
          )}

          {this.props.temperature && (
            <p className="weather__key">
              Temperature:
              <span className="weather__value">
                {" "}
                {this.props.temperature} °C
              </span>
            </p>
          )}

          {this.props.humidity && (
            <p className="weather__key">
              Humidity:
              <span className="weather__value"> {this.props.humidity} %</span>
            </p>
          )}

          {this.props.description && (
            <p className="weather__key">
              Conditions:
              <span className="weather__value"> {this.props.description} </span>
            </p>
          )}

          {this.props.error && (
            <p className="weather__error">{this.props.error}</p>
          )}
        </div>
      </>
    );
  }
}

export default Weather;
