class FavouritecitiesController < ApplicationController
  def index
      favouritecities = Favouritecity.all
      render json: favouritecities
  end

  def show
      favouritecities = Favouritecity.find_by(id: params[:id])
      if favouritecities != nil
        render json: favouritecities, except: [:created_at, :updated_at]
      else
        render json: { error: "Favourite not found." }, status: 404
      end
  end

  def create
      favouritecity = Favouritecity.new(user_id: User.all[0].id, city: params[:city], country: params[:country])
      if favouritecity.save
        render json: favouritecity
      else
        render json: {error: "Unable to create Favourite."}, status: 400
      end
    end

end
