class UsersController < ApplicationController
    def index
        @users = User.all
        render json: @users, except: [:created_at, :updated_at, :password_digest]
      end

    def show
        user = User.find_by(id: params[:id])
        if user
            render json: user, include: [:searchcities, :favouritecities], except: [:created_at, :updated_at, :password_digest]
        else
            render json: {error: "User not found."}, status: 404
        end
    end

    def signin
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            render json: { username: user.username, id: user.id }
        else
            render json: { error: 'Invalid username/password combination.'}, status: 401
        end
    end

    def signup
        user = User.new(username: params[:username], password: params[:password])
        if user.save
          render json: user
        else
          render json: {error: "Username Already Taken!"}, status: 400
        end
    end
    
end