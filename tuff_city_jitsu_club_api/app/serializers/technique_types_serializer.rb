class TechniqueTypesSerializer < ActiveModel::Serializer
  attributes(
    :id, 
    :category,
    :sub_category,
    :created_at, 
    :updated_at,
    :syllabus_id,
    :belt_id
)
end