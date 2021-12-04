class Api::V1::BeltsController < Api::ApplicationController
    before_action :authenticate_user!, except: [:index, :show]
    before_action :find_belt, only: [:show] 
    
    rescue_from(ActiveRecord:: RecordNotFound, with: :record_not_found)
    rescue_from(ActiveRecord:: RecordInvalid, with: :record_invalid)

    def index
        puts "We are in the index"
        belts = Belt.all.order(id: :asc) # This should order the pages by yellow(7), orange(6), green(5) etc.
        # belts = Belt.all
        puts "Here are the belts", belts
        render(json: belts, each_serializer: BeltsSerializer) 
        # render :json=>belts
    end

    # def create
    #     belt = Syllabus.new belt_params
    #     belt.user = current_user
    #     belt.save!
    #     render json: { id: belt.id }
    # end

    def show
        if @belt
        render(
            json: @belt
        )
        else
            render(json: {error: "Belt Not Found"})
        end
    end

    def destroy
        @belt = Belt.find(params[:id])
        @belt.destroy
        render(json: { status: 200 }, status: 200)
    end

    # def edit
    # end

    # def update
    #     if @belt.update belt_params
    #         render json: { id: @belt.id }
    #     else
    #         render(
    #             json: { errors: belt.errors },
    #             status: 422 # Unprocessable Entity
    #         )
    #     end
    # end

    private 

    def belt_params
        params.require(:belt)
        .permit( # Replace these as appropriate
            :id,
            :colour,
            :created_at,
            :updated_at
        )
    end
    
    def find_belt
        @belt ||= Belt.find params[:id]
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