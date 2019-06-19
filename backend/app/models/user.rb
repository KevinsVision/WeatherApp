class User < ApplicationRecord
    has_many :favouritecities
    has_many :searchcities
    has_secure_password
end
