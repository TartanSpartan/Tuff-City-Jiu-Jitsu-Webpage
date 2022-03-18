class InstructorQualification < ApplicationRecord
    # belongs_to :user
    # belongs_to :belt_grade
    belongs_to :belt
    belongs_to :qualification
end