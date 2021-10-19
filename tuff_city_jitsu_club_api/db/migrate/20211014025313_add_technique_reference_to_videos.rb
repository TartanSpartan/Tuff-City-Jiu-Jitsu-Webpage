class AddTechniqueReferenceToVideos < ActiveRecord::Migration[6.1]
  def change
    add_reference :videos, :technique, null: true, foreign_key: true
  end
end