class UsersController < ApplicationController
    def index
        @users = User.all
        render json: @users
      end

    def show
        user = User.find(params[:id])
        render json: user, include: [:searchcities, :favouritecities], except: [:created_at, :updated_at]
    else
    end
    

end