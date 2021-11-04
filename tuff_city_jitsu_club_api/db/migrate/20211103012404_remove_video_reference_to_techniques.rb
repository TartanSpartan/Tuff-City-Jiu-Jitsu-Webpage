class RemoveVideoReferenceToTechniques < ActiveRecord::Migration[6.1]
  def change
    remove_column :techniques, :videos_id
  end
end



# Can remove this and add video reference to technique, if the database is reset again, as they won't be required any more