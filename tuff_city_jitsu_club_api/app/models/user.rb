class User < ApplicationRecord
    # has_many :waivers, dependent: :nullify # note: uncomment when waivers are added to the website
    # has_many :posts, dependent: :nullify # note: uncomment when posts are added to the website
    # has_many :comments, dependent: :nullify # note: uncomment when comments are added to the website
    has_one :syllabus # note: uncomment when syllabus is added to the website
    has_one :instructor_qualification
    has_many :belt_grades
    has_secure_password

    # Do not need to validate belt_grade_id, qualifications_id as this is configurable only by admins or instructors
    # And these can be further constrained to sane input using dropdown menus
    validates :first_name, :last_name, presence: true
    validates :email, presence: true, uniqueness: true, confirmation: true,
    format:  /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i

    
    def full_name
      "#{first_name} #{last_name}".strip
    end
end