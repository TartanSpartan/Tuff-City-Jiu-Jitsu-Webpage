class AddVideoReferenceToTechniques < ActiveRecord::Migration[6.1]
    def change
      add_reference :techniques, :video, null: true, foreign_key: true
    end
end