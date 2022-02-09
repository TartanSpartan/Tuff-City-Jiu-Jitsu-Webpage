class UserSerializer < ActiveModel::Serializer
  attributes(
  :id,
  :first_name,
  :last_name,
  :email,
  :is_admin,
  :dues_paid,
  :owns_gi,
  :has_first_aid_qualification,
  :first_aid_achievement_date,
  :first_aid_expiry_date,
  # :created_at,
  # :updated_at
)
has_many :belt_grades
has_many :instructor_qualifications
# belongs_to :belt_grades, key :user_id
  class BeltGradesSerializer < ActiveModel::Serializer
    attributes(
      :id,
      :belt_id
    )
  end
end