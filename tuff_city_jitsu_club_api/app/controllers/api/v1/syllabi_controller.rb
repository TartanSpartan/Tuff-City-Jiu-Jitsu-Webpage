class Api::V1::SyllabiController < Api::ApplicationController
    before_action :authenticate_user!, except: [:index, :show]
    before_action :get_syllabus_index_page_data, only: [:show, :edit, :update, :destroy]
    # Following line may be redundant given preceding line
    # before_action :find_syllabus, only: [:show, :edit, :update, :destroy]
    
    rescue_from(ActiveRecord:: RecordNotFound, with: :record_not_found)
    rescue_from(ActiveRecord:: RecordInvalid, with: :record_invalid)

    # Note- have instructed the initializer "inflection" file about the proper plural form of syllabus

    def index
        syllabi = Syllabus.order(id: :asc) # This should order the pages by yellow(7), orange(6), green(5) etc.
        render(json: syllabi, each_serializer: SyllabusSerializer) 
        # Now do we need a belt/technique_type/technique controller to account for their serializers, or can we simply call their serializers in this controller?
    end

    def create
        syllabus = Syllabus.new syllabus_params
        syllabus.user = current_user
        syllabus.save!
        render json: { id: syllabus.id }
    end

    def show
        if @syllabus
        render(
            json: @syllabus
        )
        else
            render(json: {error: "Syllabus Not Found"})
        end
    end

    def destroy
        @syllabus.destroy
        render(json: { status: 200 }, status: 200)
    end

    def edit
    end

    def update
        if @syllabus.update syllabus_params
            render json: { id: @syllabus.id }
        else
            render(
                json: { errors: syllabus.errors },
                status: 422 # Unprocessable Entity
            )
        end
    end

    def get_syllabus_index_page_data
        # Target: create dynamic subset of the syllabus according to which belt grade the current user is
        puts "testing 1 2 3"
        search_belt = params[:belt_id]
        # current_user = params[:user_id]
        syllabus_id = params[:syllabus_id]
        payload = Hash.new # This is a hash in Rails with everything we need: one belt, with all techniques, technique types, etc, as an all-in-one
        payload[:belts] = Belt.find_by(id:search_belt)
        payload[:techniques] = Technique.where(:belt_id=>search_belt)
        payload[:technique_types] = TechniqueType.where(:belt_id=>search_belt)
        # payload[:users] = User.find_by(id:user_id)
        if payload
            # puts "This is the current user", current_user
            puts "Here is the syllabus according to the needs of the current user", payload
            render(json: payload) 
        else
            render(json: {error: "Syllabus Not Found"})
        end
    end

    def find_all_belts
        search_syllabus = params[:syllabus_id]
        @user = current_user
        belt_grade = BeltGrade.where(:user_id => @user.id)
        puts "testing 1 2 3" 
        puts "These are the params", params
        puts "This is the current user", @user
        puts "This is the current belt grade id", belt_grade[0].id
        user_belt = belt_grade[0].belt_id
        initial = user_belt - 1
        puts "This is the initial number", initial
        last = 8
        belt_range = Array(initial..last)
        puts belt_range

        payload = Hash.new # This is a hash in Rails with everything we need: all belts, techniques, technique types, etc, as an all-in-one
        belts = Belt.where(:id => belt_range)
        puts "This is the belt up to which the syllabus will print", belts
        payload[:belts]=belts.map do |belt, index|
            puts belt
            techniques = Technique.where(:belt_id=>belt.id).order(created_at: :asc)
            technique_types = TechniqueType.where(:belt_id=>belt.id).order(created_at: :asc)
            {colour: belt.colour, id: belt.id, techniques:  techniques, technique_types: technique_types}
        end
        #payload[:techniques] = Technique.where(:belt_id=>search_belt)
        # payload[:technique_types] = TechniqueType.where(:belt_id=>search_belt)
        if payload
            puts "This is the current user", current_user
            puts "Here is the syllabus according to the grade of the current user", payload
            render(json: payload) 
        else
            render(json: {error: "Syllabus Not Found"})
        end
        # then in front end, devise nice colour coding with e.g. vertical bar strips along with David
    end

    private 

    def syllabus_params
        params.require(:syllabus)
        .permit( # Replace these as appropriate
            :id,
            :country,
            :user_id,
            :created_at,
            :updated_at
        )
    end
    
    def find_syllabus
        @syllabus||= Syllabus.find params[:id]
    end

    def record_not_found
        render(
            json: { status: 422, errors: {msg: 'Record Not Found'}},
            status: 422
        )
    end
    
    def record_invalid(error) 
        invalid_record = error.record 
        errors = invalid_record.errors.map do |field, message|
        {
            type: error.class.to_s, 
            record_type: invalid_record.class.to_s,
            field: field,
            message: message
        }
        end
        render(
            json: { status: 422, errors: errors }
        )
    end

end