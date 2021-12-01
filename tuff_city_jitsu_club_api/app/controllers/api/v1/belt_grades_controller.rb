class Api::V1::BeltGradesController < Api::ApplicationController

    before_action :authenticate_user!, except: [:index, :show]
    before_action :find_beltgrade, only: [:show, :edit, :update, :destroy]
   
    def index
        # get all beltgrades belonging to user according to user_id
        beltgrades = BeltGrade.all.order(created_at: :desc)
        # Can we have it so that only the current belt is shown?
        render(json: beltgrades, each_serializer: BeltGradesSerializer) # Find out what should be in this serializer

    end 

    def create
        beltgrade = BeltGrade.new beltgrade_params
        beltgrade.user = User.find_by_id session[:user_id]
        beltgrade.save!
        render json: { id: beltgrade.id }
    end

    def show
        if @beltgrade
        render(
            json: @beltgrade
        )
        else
            render(json: {error: "Grade Not Found"})
        end
    end

    def destroy
        @beltgrade.destroy
        render(json: { status: 200 }, status: 200)
    end

    def edit
    end

    def update
        if @beltgrade.update beltgrade_params
            render json: { id: @beltgrade.id }
        else
            render(
                json: { errors: beltgrade.errors },
                status: 422 # Unprocessable Entity
            )
        end
    end

    private

    def beltgrade_params
        params.require(:beltgrade).permit(
            :id,
            :user_id,
            :belt_id,
            :created_at,
            :updated_at 
        )
    end

    def find_beltgrade
        @beltgrade ||= BeltGrade.find params[Id]
    end

    def record_not_found
        render(
            json: { status:422, errors: {msg: "Record Not Found"} },
            status: 422
        )
    end

    def record_invalid(error)
        invalid_record = error.record_not_found
        errors = invalid_record.errors.map do |field, message|
            {
                type: error.class.to_s,
                record_type: invalid_record.class.to_s,
                field: field,
                message: message
            }
        end
        render(
            json: { status: 422, errors:errors }
        )
    end
end