class VideosSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :canadian_version,
    :uk_version,
    :created_at,
    :updated_at,
    :technique_id
)
end