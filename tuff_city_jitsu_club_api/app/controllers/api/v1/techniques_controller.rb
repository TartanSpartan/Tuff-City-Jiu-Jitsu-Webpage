class Api::V1::TechniquesController < Api::ApplicationController
    before_action :authenticate_user!, except: [:index, :show]
    before_action :authorize_user!, except: [:read]
    before_action :find_technique, only: [:edit, :update, :destroy]
    
    rescue_from(ActiveRecord:: RecordNotFound, with: :record_not_found)
    rescue_from(ActiveRecord:: RecordInvalid, with: :record_invalid)

    def index
        techniques = Technique.all.order(belt_id: :desc) # This should order the techniques by belt number
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
        authorize! :create, @technique
        # authorize_user! :create, @technique

        # Get params for technique type and syllabus_id
        # Save technique_type 
        # Create technique with technique_type and the params
        # Use belt and technique_type serializers to help display that info

        # {"syllabus"=>"Canada", "summary"=>"O-goshi", "category"=>"Nage-waza (throwing)", "sub_category"=>"Hip throw", "is_different"=>"No", "difference_content"=>"", "format"=>:json, "controller"=>"api/v1/techniques", "action"=>"create", "technique"=>{"summary"=>"O-goshi", "is_different"=>"No", "difference_content"=>""}}

        puts "Here are the params", params
        new_syllabus = Syllabus.find_by(country: params["syllabus"])
        belt_check = Belt.where(id: params["belt"])[0]
        puts "Here is the new syllabus", new_syllabus
        existing_technique_type = TechniqueType.where(category: params["category"], sub_category: params["sub_category"], belt_id: params["belt"].to_i)
        if existing_technique_type.length > 0
            puts "We have an existing technique type"
            technique_type_id = existing_technique_type[0].id
        else 
            puts "We need to create a new technique type"
            type_of_technique = TechniqueType.new category: params["category"], sub_category: params["sub_category"], syllabus_id:new_syllabus.id
            puts "This is the type we are trying to create", type_of_technique, type_of_technique.category
            type_of_technique.belt = Belt.where(id: params["belt"])[0]
            type_of_technique.save! 
            technique_type_id = type_of_technique.id
        end
        puts "The technique type ID is ", technique_type_id
        puts "This is the summary", params["technique"]["summary"]
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
        video_array = []
        # Take the video array from the front end
        # params videos.each
        # for each in that array
        # do video.create
        params["videos"].each do |video|
            puts "This is the video loop", video
            new_video = Video.create! canadian_version: video["canadianUrl"], uk_version: video["britishUrl"], technique_id: technique.id
            video_array.push(new_video.id)
        end
        #byebug
        technique.videourls = video_array
        technique.save!
        puts "This are the params to be committed", params
        puts "This is the technique", technique
        render json: { id: new_syllabus.id }
        # authorize_user! :create, @technique
    end

    def show
        puts "Here are the params", params["id"]

        technique = Technique.find params["id"]
        puts technique
        if technique
            puts "Here is the technique", technique
            puts "Here are the technique params", technique.videourls
            #puts "these are the params (to test videourls):", "summary: ", params["technique"]["summary"], "is it different?: ", params["technique"]["is_different"], "if so what is the difference? ", params["difference_content"], "technique type id: ", technique_type_id, "belt id: ", params["belt"].to_i, "videourls: ", params["videourls"].to_s

            render(
                json: technique
                    )
        else
            render(json: {error: "Technique Not Found"})
        end
    end

    def destroy
        # We do a cascading delete for the videos associated with the technique, then delete the technique itself
        puts "######@"
        puts @technique.id
        videos = Video.where(:technique_id =>@technique.id)
        videos.each do |video|
            video.destroy
        end
        @technique.destroy
        render(json: { status: 200 }, status: 200)
    end

    def edit
    end

    def update
        authorize_user!
        puts "Here are the params", params
        # puts "We need to search for this", country: params["country"]
        modified_syllabus = Syllabus.find_by(country: "canada") # The id it should find will be 2
        puts "Is the syllabus modified?", modified_syllabus
        technique = Technique.find(params["id"])
        existing_technique_type = TechniqueType.where(category: params["category"], sub_category: params["sub_category"])[0]
        puts "Do we have an existing TT?", existing_technique_type
        # belt = Belt.where(id: params["belt_id"])[0]
        # byebug
        # NOTE: Delete empi kata(41), expose Testing multiple videos(51)

        if (existing_technique_type) 
            existing_technique_type.update(syllabus_id:modified_syllabus.id, belt_id: params["belt"].to_i)
            technique_type = existing_technique_type
        else
            technique_type = TechniqueType.create(category: params["category"], sub_category: params["sub_category"], syllabus_id:modified_syllabus.id, belt_id: params["belt"].to_i)
        end
        puts "Did that create a new TT?", technique_type

        technique.update(summary: params["technique"]["summary"], is_different:params["technique"]["is_different"], difference_content:params["technique"]["difference_content"], technique_type_id: technique_type.id, belt_id: params["belt"].to_i)
        update_video = Video.create! canadian_version: params["canadianUrl"], uk_version: params["britishUrl"], technique_id: technique.id
        technique.videourls = [update_video]
        technique.save!

        # byebug
        # Convert the following to work by a map instead of using .each
        # video_array = []
        # params["videos"].each do |video|
        #     puts "This is the video loop", video
        #     update_video = Video.create! canadian_version: video["canadianUrl"], uk_version: video["britishUrl"], technique_id: technique.id
        #     video_array.push(update_video.id)
        # end
        # technique.videourls = video_array
        # technique.save!
        puts "This are the params to be committed", params
        puts "This is the updated technique", technique
        render json: { id: modified_syllabus.id }
        authorize_user! # :update, @technique
    end

    def find
        # puts "TESTING ========#{current_user.id}" 
        # @technique = Technique.where("belt_grade LIKE ? OR technique_type.category LIKE ?", "%#{params[:search_string]}%", "%#{params[:search_string]}%")
        current_user = User.find_by_id session[:user_id]
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
            :id,
            :summary,
            :is_different,
            :difference_content,
            :created_at,
            :updated_at,
            :technique_type_id,
            :belt_id,
            :videourls
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

    def authorize_user!
        # unless can? :create, @technique
        if current_user.is_admin?
            return
        else
            puts "Are you denied? Yes you are"
            flash[:danger] = "Access Denied"
        end
        #   redirect_to root_path
        # end
    end 

end