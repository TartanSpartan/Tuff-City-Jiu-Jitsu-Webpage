class TechniquesSerializer < ActiveModel::Serializer
  attributes(
    :id, 
    :summary,
    :is_different,
    :difference_content,
    :created_at, 
    :updated_at,
    :technique_type_id,
    :belt_id,
    :videourls
)
end