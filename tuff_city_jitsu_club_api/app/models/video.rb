class Video < ApplicationRecord
    has_many :techniques
    has_many :urls, dependent: :destroy
    has_many :technique_urls, through: :urls, source: :technique
end