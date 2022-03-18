class AddUserReferenceToSyllabi < ActiveRecord::Migration[6.1]
    def change
      add_reference :syllabi, :user, null: true, foreign_key: true
    end
  end