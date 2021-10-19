# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_10_14_025313) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "belt_grades", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "belt_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["belt_id"], name: "index_belt_grades_on_belt_id"
    t.index ["user_id"], name: "index_belt_grades_on_user_id"
  end

  create_table "belts", force: :cascade do |t|
    t.string "colour"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "syllabus_id"
    t.index ["syllabus_id"], name: "index_belts_on_syllabus_id"
  end

  create_table "instructor_qualifications", force: :cascade do |t|
    t.datetime "achieved_at"
    t.bigint "user_id", null: false
    t.bigint "belt_id", null: false
    t.bigint "belt_grade_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "qualification_id", null: false
    t.index ["belt_grade_id"], name: "index_instructor_qualifications_on_belt_grade_id"
    t.index ["belt_id"], name: "index_instructor_qualifications_on_belt_id"
    t.index ["qualification_id"], name: "index_instructor_qualifications_on_qualification_id"
    t.index ["user_id"], name: "index_instructor_qualifications_on_user_id"
  end

  create_table "qualifications", force: :cascade do |t|
    t.string "level"
    t.bigint "belt_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["belt_id"], name: "index_qualifications_on_belt_id"
  end

  create_table "syllabi", force: :cascade do |t|
    t.string "country"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_syllabi_on_user_id"
  end

  create_table "technique_types", force: :cascade do |t|
    t.string "category"
    t.string "sub_category"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "syllabus_id", null: false
    t.bigint "belt_id"
    t.index ["belt_id"], name: "index_technique_types_on_belt_id"
    t.index ["syllabus_id"], name: "index_technique_types_on_syllabus_id"
  end

  create_table "techniques", force: :cascade do |t|
    t.string "summary"
    t.bigint "videos_id"
    t.boolean "is_different"
    t.string "difference_content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "technique_type_id", null: false
    t.bigint "belt_id", null: false
    t.integer "videourls", default: [], array: true
    t.index ["belt_id"], name: "index_techniques_on_belt_id"
    t.index ["technique_type_id"], name: "index_techniques_on_technique_type_id"
    t.index ["videos_id"], name: "index_techniques_on_videos_id"
  end

  create_table "training_bubbles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_training_bubbles_on_user_id"
  end

  create_table "urls", force: :cascade do |t|
    t.bigint "technique_id", null: false
    t.bigint "video_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["technique_id"], name: "index_urls_on_technique_id"
    t.index ["video_id"], name: "index_urls_on_video_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.boolean "is_admin", default: false
    t.boolean "dues_paid"
    t.boolean "owns_gi"
    t.boolean "has_first_aid_qualification"
    t.datetime "first_aid_achievement_date"
    t.datetime "first_aid_expiry_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  create_table "videos", force: :cascade do |t|
    t.string "canadian_version"
    t.string "uk_version"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "technique_id"
    t.index ["technique_id"], name: "index_videos_on_technique_id"
  end

  add_foreign_key "belt_grades", "belts"
  add_foreign_key "belt_grades", "users"
  add_foreign_key "belts", "syllabi"
  add_foreign_key "instructor_qualifications", "belt_grades"
  add_foreign_key "instructor_qualifications", "belts"
  add_foreign_key "instructor_qualifications", "qualifications"
  add_foreign_key "instructor_qualifications", "users"
  add_foreign_key "qualifications", "belts"
  add_foreign_key "syllabi", "users"
  add_foreign_key "technique_types", "belts"
  add_foreign_key "technique_types", "syllabi"
  add_foreign_key "techniques", "belts"
  add_foreign_key "techniques", "technique_types"
  add_foreign_key "techniques", "videos", column: "videos_id"
  add_foreign_key "training_bubbles", "users"
  add_foreign_key "urls", "techniques"
  add_foreign_key "urls", "videos"
  add_foreign_key "videos", "techniques"
end
