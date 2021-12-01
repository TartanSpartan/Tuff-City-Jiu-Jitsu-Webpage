class TechniquesSerializer < ActiveModel::Serializer
  attributes(
    :id, 
    :summary,
    :videourls,
    :is_different,
    :difference_content,
    :technique_type_id,
    :created_at, 
    :updated_at,
    :belt_id
)
end