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
  :created_at,
  :updated_at
)
end
