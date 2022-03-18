class Syllabus < ApplicationRecord
    # has_many :user
    # Uncomment out the following when these features are implemented:
    # has_many :videos
    # has_many :techniques # probably redundant if it has this grandchilded through technique_types
    has_many :belts
    has_many :technique_types
    # has_one semantic_tree
end