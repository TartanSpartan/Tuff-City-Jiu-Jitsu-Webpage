class CreateTechniques < ActiveRecord::Migration[6.1]
  def change
    create_table :techniques do |t|
      t.string :summary
      t.references :videos, null:true, foreign_key:true
      t.boolean :is_different
      t.string :difference_content # Include if the boolean is true

      t.timestamps
    end
  end
end