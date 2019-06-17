class SearchcitiesController < ApplicationController
    def index
        @searchcities = Searchcities.all
        render json: @searchcities
      end

    def show
        searchcities = Searchcities.find(params[:id])
        render json: searchcities
    end
end
