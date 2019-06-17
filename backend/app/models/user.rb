class User < ApplicationRecord
    has_many :favouritecities
    has_many :searchcities
end
