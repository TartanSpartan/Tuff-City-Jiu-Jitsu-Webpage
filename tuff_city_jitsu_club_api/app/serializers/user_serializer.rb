class UserSerializer < ActiveModel::Serializer
  attributes(
    :id, 
    :email,
    :first_name, 
    :last_name, 
    :full_name,
    :is_admin,
    :created_at, 
    :updated_at
)
end
