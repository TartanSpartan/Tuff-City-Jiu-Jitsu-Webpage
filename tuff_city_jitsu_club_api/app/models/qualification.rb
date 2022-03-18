class Qualification < ApplicationRecord
    before_save :capitalize_level
    # belongs_to :belt
    has_one :instructor_qualification
    
      
    private
    
    def capitalize_level
      self.level.capitalize!
    end
end