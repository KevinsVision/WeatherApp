Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  resources :favouritecities
  resources :searchcities
  post '/signin', to: 'users#signin'
  post '/signup', to: 'users#signup'

end
