class Api::V1::TechniquesController < Api::ApplicationController
    before_action :authenticate_user!, except: [:index, :show]
    before_action :find_technique, only: [:edit, :update, :destroy]
    
    rescue_from(ActiveRecord:: RecordNotFound, with: :record_not_found)
    rescue_from(ActiveRecord:: RecordInvalid, with: :record_invalid)


    def index
        techniques = Technique.all.order(belt_id: :desc) # This should order the techniques by beltcode
        render(json: techniques, each_serializer: TechniquesSerializer) # Find out what should be in this serializer
    end


    # const techniques = [
    #     {
    #       name: "a",
    #       belt_grade: "yellow"
    #     },
    #     {
    #       name: "b",
    #       belt_grade: "yellow"
    #     },
    #     {
    #       name: "c",
    #       belt_grade: "black"
    #     }
    #   ]

    # We can grab all of the above from our serializers here on the backend


    #   const techniquesGroupedByBeltGrade = {};
    #   for (let technique of techniques) {
    #     const { name, belt_grade } = technique;
    #     if (techniquesGroupedByBeltGrade[belt_grade]) {
    #       techniquesGroupedByBeltGrade[belt_grade].push(technique)
    #     } else {
    #       techniquesGroupedByBeltGrade[belt_grade] = [technique]
    #     }
    #   }

    # The above Javascript code ported to Ruby looks something like (WIP):

    # techniquesGroupedByBeltGrade = {}
    # # for loop
    # for technique in 1..techniques
    #     # const { name, belt_grade } = technique; # I'm thinking we need all of the technique attributes, belt_grade ids and technique type attributes here
    #     if techniquesGroupedByBeltGrade[belt_grade]
    # #       techniquesGroupedByBeltGrade[belt_grade].push(technique)
    #     else
    # #       techniquesGroupedByBeltGrade[belt_grade] = [technique]
    #     end
    # end

    # Then we can use the following code as a basis on the React side to render:
    #   // console.log(techniquesGroupedByBeltGrade)
    #   Object.keys(techniquesGroupedByBeltGrade).map((belt_grade) => {
    #     belt_grade.map((technique) => {
    #       return(
    #         <div> technique.name </div>
    #       )
    #     })
    #   })


    def create
        # Get params for technique type and syllabus_id
        # Save technique_type 
        # Create technique with technique_type and the params
        # Use belt and technique_type serializers to help display that info

        # {"syllabus"=>"Canada", "summary"=>"O-goshi", "category"=>"Nage-waza (throwing)", "sub_category"=>"Hip throw", "is_different"=>"No", "difference_content"=>"", "format"=>:json, "controller"=>"api/v1/techniques", "action"=>"create", "technique"=>{"summary"=>"O-goshi", "is_different"=>"No", "difference_content"=>""}}

        puts "Here are the params", params
        new_syllabus = Syllabus.find_by(country: params["syllabus"])
        puts new_syllabus
        existing_technique_type = TechniqueType.where(category: params["category"], sub_category: params["sub_category"])
        if existing_technique_type.length > 0
            technique_type_id = existing_technique_type[0].id
        else 
            type_of_technique = TechniqueType.new category: params["category"], sub_category: params["sub_category"], syllabus_id:new_syllabus.id
            puts type_of_technique
            type_of_technique.belt = Belt.where(id: params["belt"])[0]
            type_of_technique.save! # Note: on next lines, videos is hardcoded until video functionality added
            technique_type_id = type_of_technique.id
        end
        puts "The technique type ID is ", technique_type_id
        puts "This is the summary", params["technique"]["summary"]
        puts "This "
        puts "*************************************************************************"
        puts "these are the params:", "summary: ", params["technique"]["summary"], "is it different?: ", params["technique"]["is_different"], "if so what is the difference? ", params["difference_content"], "technique type id: ", technique_type_id, "belt id: ", params["belt"].to_i
        
        # if 

        
        # end
        # videos: params["technique"]["videos"]
        technique = Technique.new summary: params["technique"]["summary"], is_different:params["technique"]["is_different"], difference_content:params["technique"]["difference_content"], technique_type_id: technique_type_id, belt_id: params["belt"].to_i
        puts "This is the belt", technique.belt_id
        # byebug
        technique.save!
        # byebug
        puts "This is the params to be committed", params
        video = Video.create! canadian_version: params["videos"][0]["canadianUrl"], technique_id: technique.id
        puts "This is the technique", technique
        puts "This is the video", video
        render json: { id: new_syllabus.id }
    end

    def show
        puts "Here are the params", params["id"]
        technique = Technique.find params["id"]
        puts technique
        if technique
            puts "Here is the technique", technique
            render(
                json: technique
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
            puts "These are the technique params", technique_params
            render json: { id: @technique.id }
        else
            render(
                json: { errors: technique.errors },
                status: 422 # Unprocessable Entity
            )
        end
    end

    def find
        # puts "TESTING ========#{current_user.id}" 
        # @technique = Technique.where("belt_grade LIKE ? OR technique_type.category LIKE ?", "%#{params[:search_string]}%", "%#{params[:search_string]}%")
        belt_id = BeltGrade.where("user_id = ?", current_user.id).first.id
        technique = Technique.where("belt_id = ?", belt_id) #, current_user.id)
        puts "This is the belt we're referring to", belt_id
        puts "This is the technique we want", @technique

        
        # render(
        #     json: technique #, each_serializer: TechniquesSerializer
        #     )

        technique = Technique.all
        render(
            json: technique.as_json
        )
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
        # Rewrite these and similar methods in other controllers for optimisation and json rendering; for now using a .join which will print on the Rails console
        invalid_record = error.record 
        # errors = invalid_record.errors.map do |field, message|
        # errors = invalid_record.errors.map do |error|
        # {
        #     # type: error.class.to_s, 
        #     # record_type: invalid_record.class.to_s,
        #     attribute: error.attribute,
        #     #field: error.field,
        #     message: error.message
        # }
        # end
        errors = invalid_record.errors.map(&:full_message).join(", ")
        puts "These are the errors", errors
        # Currently an error is "Belts must exist"... do not understand this! They do exist.
        render(
            json: { status: 422, errors: errors }
        )
    end

end