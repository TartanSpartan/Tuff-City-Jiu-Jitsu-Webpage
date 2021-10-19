class VideosSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :canadian_version,
    :uk_version,
    :technique_id
)
end