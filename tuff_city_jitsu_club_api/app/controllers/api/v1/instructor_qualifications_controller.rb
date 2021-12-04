class Api::V1::InstructorQualificationsController < Api::ApplicationController
    before_action :authenticate_user!, except: [:index, :show]
    before_action :find_instructor_qualification, only: [:show, :edit, :update, :destroy]
   
    def index
        instructorqualifications = InstructorQualification.order(created_at: :desc)
        render(json: instructorqualifications, each_serializer: InstructorQualificationSerializer)
    end 

    def create
        instructorqualification = InstructorQualification.new instructor_qualification_params
        instructorqualification.user = User.find_by_id session[:user_id]
        instructorqualification.save!
        render json: { id: instructorqualification.id }
    end

    def show
        if @instructorqualification
        render(
            json: @instructorqualification
        )
        else
            render(json: {error: "Qualification Not Found"})
        end
    end

    def destroy
        @instructorqualification.destroy
        render(json: { status: 200 }, status: 200)
    end

    def edit
    end

    def update
        if @instructorqualification.update instructorqualification_params
            render json: { id: @instructorqualification.id }
        else
            render(
                json: { errors: instructorqualification.errors },
                status: 422 # Unprocessable Entity
            )
        end
    end

    private

    def instructor_qualification_params
        params.require(:instructor_qualification)
        .permit( # Replace these as appropriate
            :id,
            :achieved_at,
            :user_id,
            :belt_id,
            :belt_grade_id,
            :created_at,
            :updated_at,
            :qualification_id
        )
    end

    def find_qualification
        @qualification ||= InstructorQualification.find params[Id]
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