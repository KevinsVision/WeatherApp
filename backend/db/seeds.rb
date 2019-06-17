# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Searchcity.destroy_all
Favouritecity.destroy_all
xabi = User.create(username: "Xabi")
london = Searchcity.create(user: xabi, citysearch: "london", countrysesrch: "uk")