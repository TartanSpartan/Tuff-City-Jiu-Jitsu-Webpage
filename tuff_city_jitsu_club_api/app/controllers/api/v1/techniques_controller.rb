class Api::V1::TechniquesController < Api::ApplicationController
    before_action :authenticate_user!, except: [:index, :show]
    before_action :find_technique, only: [:show, :edit, :update, :destroy]
    
    rescue_from(ActiveRecord:: RecordNotFound, with: :record_not_found)
    rescue_from(ActiveRecord:: RecordInvalid, with: :record_invalid)


    def index
        techniques = Technique.all.order(belt_id: :desc) # This should order the techniques by belt
        render(json: techniques, each_serializer: TechniquesSerializer) # Find out what should be in this serializer
    end



    def create
        # Get params for technique type and syllabus_id
        # Save technique_type 
        # Create technique with technique_type and the params
        # Use belt and technique_type serializers to help display that info

        # {"syllabus"=>"Canada", "summary"=>"O-goshi", "category"=>"Nage-waza (throwing)", "sub_category"=>"Hip throw", "is_different"=>"No", "difference_content"=>"", "format"=>:json, "controller"=>"api/v1/techniques", "action"=>"create", "technique"=>{"summary"=>"O-goshi", "is_different"=>"No", "difference_content"=>""}}

        puts "Here are the params", params
        new_syllabus = Syllabus.find_by(country: params["syllabus"])
        puts new_syllabus
        type_of_technique = TechniqueType.new category: params["category"], sub_category: params["sub_category"], syllabus_id:new_syllabus.id
        puts type_of_technique
        type_of_technique.save! # Note: on next line, videos is hardcoded until video functionality added
        technique_type_id = type_of_technique.id
        puts "The technique type ID is ", technique_type_id
        puts "This is the summary", params["technique"]["summary"]
        technique = Technique.new summary: params["technique"]["summary"], videos_id:1, is_different:params["technique"]["is_different"], difference_content:params["difference_content"], technique_type_id: technique_type_id, belt_id: params["belt"].to_i
        puts "This is the belt", technique.belt_id
        technique.save!
        render json: { id: new_syllabus.id }
    end

    def show
        if @technique
        puts "Here is the technique", @technique
        render(
            json: @technique
                )
        else
            render(json: {error: "Technique Not Found"})
        end
    end

    def destroy
        @technique.destroy
        render(json: { status: 200 }, status: 200)
    end

    def edit
    end

    def update
        if @technique.update technique_params
            render json: { id: @technique.id }
        else
            render(
                json: { errors: technique.errors },
                status: 422 # Unprocessable Entity
            )
        end
    end

    private 

    def technique_params
        params.require(:technique)
        .permit( # Replace these as appropriate
            :summary,
            :is_different,
            :difference_content,
            :belt_id
        )
    end
    
    def find_technique
        @technique ||= Technique.find params[:id]
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