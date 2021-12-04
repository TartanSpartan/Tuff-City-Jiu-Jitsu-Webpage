class Api::V1::TechniqueTypesController < Api::ApplicationController
    before_action :authenticate_user!, except: [:index, :show]
    before_action :find_technique_types, only: [:edit, :update, :destroy]
    
    rescue_from(ActiveRecord:: RecordNotFound, with: :record_not_found)
    rescue_from(ActiveRecord:: RecordInvalid, with: :record_invalid)


    def index
        technique_types = TechniqueType.all.order(belt_id: :desc) # This should order the technique types by belt number
        render(json: technique_types, each_serializer: TechniqueTypesSerializer) # Find out what should be in this serializer
    end

    def show
        puts "Here are the params", params["id"]
        technique_type = TechniqueType.find params["id"]
        puts technique_type
        if technique_type
        puts "Here is the technique type", technique_type
        render(
            json: technique_type
                )
        else
            render(json: {error: "Technique Type Not Found"})
        end
    end

    def destroy
        @technique_type.destroy
        render(json: { status: 200 }, status: 200)
    end

    def edit
    end

    def update
        if @technique_type.update technique_params
            render json: { id: @technique_type.id }
        else
            render(
                json: { errors: technique_type.errors },
                status: 422 # Unprocessable Entity
            )
        end
    end



    def find
        # puts "TESTING ========#{current_user.id}" 
        # @technique = Technique.where("belt_grade LIKE ? OR technique_type.category LIKE ?", "%#{params[:search_string]}%", "%#{params[:search_string]}%")
        # belt_id = BeltGrade.where("user_id = ?", current_user.id).first.id
        # technique_type = TechniqueType.where("belt_id = ?", belt_id) #, current_user.id)
        # puts "This is the belt we're referring to", belt_id
        # puts "This is the technique type we want", @technique_type

        puts "These are the search parameters", params["id"]
        # technique_id = Technique.where("video_ids = ?", Video.ids).first.id
        technique_type = TechniqueType.where("technique_type_id = ?", params["id"]) 

        puts "################# here are the technique_types", technique_type





        # render(
        #     json: technique #, each_serializer: TechniquesSerializer
        #     )

        # technique_type = TechniqueType.all
        render(
            json: technique_type.as_json
        )









        # puts "TESTING ========#{current_user.id}" 
        # @technique = Technique.where("belt_grade LIKE ? OR technique_type.category LIKE ?", "%#{params[:search_string]}%", "%#{params[:search_string]}%")
        # belt_id = BeltGrade.where("user_id = ?", current_user.id).first.id # Might need to change this one and so on, test
        # technique_type = TechniqueType.where("belt_id = ?", belt_id) #, current_user.id)
        # puts "This is the belt we're referring to", belt_id
        # puts "This is the technique type we want", technique_type

        
        # render(
        #     json: technique #, each_serializer: TechniquesSerializer
        #     )

        # technique_types = TechniqueType.all
        
        # puts "#################", technique_types
        # techniques = Technique.all

        # render(
        #     json: technique_types, each_serializer: TechniqueTypesSerializer
        # )

        # render(
        #     json: techniques, each_serializer:TechniquesSerializer
        # )

        # render(
        #     json: technique_types.as_json
        # )


        
    end

    private 

    def technique_type_params
        params.require(:technique_type)
        .permit( # Replace these as appropriate
            :id, 
            :category,
            :sub_category,
            :created_at, 
            :updated_at,
            :syllabus_id,
            :belt_id
        )
    end
    
    def find_technique_type
        @technique_type ||= TechniqueType.find params[:id]
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