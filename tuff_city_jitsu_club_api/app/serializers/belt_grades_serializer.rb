class BeltGradesSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :belt_id
  )
  belongs_to :user
end