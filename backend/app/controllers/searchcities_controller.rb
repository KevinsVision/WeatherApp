class SearchcitiesController < ApplicationController
    def index
        searchcities = Searchcity.all
        render json: searchcities
    end

    def show
        searchcities = Searchcity.find_by(id: params[:id])
        if searchcities != nil
          render json: searchcities, except: [:created_at, :updated_at]
        else
          render json: { error: "Search not found." }, status: 404
        end
    end

    def create
        searchcity = Searchcity.new(user_id: User.all[0].id, city: params[:city], country: params[:country])
        if searchcity.save
          render json: searchcity
        else
          render json: {error: "Unable to create Search."}, status: 400
        end
      end
end
