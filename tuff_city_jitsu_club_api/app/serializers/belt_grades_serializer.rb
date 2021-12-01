class BeltGradesSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :user_id,
    :belt_id,
    :created_at,
    :updated_at
  )
end
