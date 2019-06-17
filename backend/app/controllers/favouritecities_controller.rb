class FavouritecitiesController < ApplicationController
        def index
        @favouritecity = Favouritecity.all
        render json: @favouritecities
      end

    def show
        favouritecities = favouritecities.find(params[:id])
        render json: favouritecities
    end
end
