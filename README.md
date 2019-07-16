## Weather App
This is an app to check the weather in a specific city. It consists in a dashboard in which, after loging in, you can type a city and a country. After that, it shows the temperature, humidity and conditions of that city. Then, you can add it to your favourites and that city appears in your previous searches.

## Motivation
This is the forth proyect for the Flatiron School Software Engineering bootcamp. The basic requirements for this project are the use of Ruby on Rails for the back-end an React for the front-end.

## Server
The backend it's built in Ruby on Rails with a PostgreSQL database, using an object-oriented programming approach. The app has 3 models: User, SearchCity and FavouriteCity.

- A User has many SearchCities.
- A SearchCity belongs to a User.
- A User has many FavouriteCities.
- A FavouriteCity belongs to a User.

There are API endpoints for all models. The app uses mainly the User endpoint. Authoritation is done with Rails, using bcrypt for encyption.

## Client
The client-side of the application is built in React. The style is done by a combination of Semantic and CSS.

## Initialization
1. Clone and open the project in a code editor.
2. Go into the back-end folder.
3. Run `bundle install`.
4. Run `rails db:migrate` and `rails db:seed`.
5. Run `rails s`.
6. Go to the front-end folder.
7. Run `npm install`.
8. Run `npm start`.

## Screenshots and Gif

Log in:
![Log in](https://github.com/DarkScarbo/Mod-5-Project---My-Piano-Teaching-Website/blob/master/front-end/public/Student-Booking.gif)

Make a Booking as a Student:
![Make a Booking as a Student](https://github.com/DarkScarbo/Mod-5-Project---My-Piano-Teaching-Website/blob/master/front-end/public/Student-Booking.gif)
