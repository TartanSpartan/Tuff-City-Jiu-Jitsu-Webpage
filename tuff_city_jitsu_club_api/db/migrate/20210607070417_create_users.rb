class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email, index: {unique: true}
      t.string :password_digest
      t.boolean :is_admin, default: false

      # t.boolean :is_instructor, default: false # Instructors, like students, can see up to the grade above them for syllabus, but only the admin (i.e. me) can see the full syllabus.
      # A fully fledged (club) instructor gets the full syllabus, and full privileges, we will get more of these instructors as they grade upwards.
      # t.bigint :belt_id # foreign key linking to another table like products vs reviews, one to many
      # t.bigint :instructor_qualification_id # user table joins through qualifications table, using a model and controllers for qualifications
      t.boolean :dues_paid
      t.boolean :owns_gi
      t.boolean :has_first_aid_qualification
      t.datetime :first_aid_achievement_date
      t.datetime :first_aid_expiry_date

      
      t.timestamps
    end
  end
end