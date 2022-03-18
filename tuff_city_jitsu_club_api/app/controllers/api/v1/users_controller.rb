class Api::V1::UsersController < Api::ApplicationController
    before_action :authenticate_user!, only: [:current]
    before_action :authorize_user!, except: [:read]
    before_action :find_user, only: [:show, :update, :destroy]

    rescue_from(ActiveRecord:: RecordNotFound, with: :record_not_found)
    rescue_from(ActiveRecord:: RecordInvalid, with: :record_invalid)

    def current
        render json: current_user
    end

    def index
        users = User.order(created_at: :desc)
        puts "These are the users", users
        render(json: users)
    end

    def create
        user_params = params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
        user = User.new user_params

        # user = User.new first_name: params["first_name"], last_name: params["last_name"], email: params["email"]

        user.save!
        user.inspect

        # Next, we need to create a belt grade for the user, setting the belt id to 8/white (by default we assume new students are white belts, but also they may be joining with a higher belt on their waist), and the admin can update it later
        belt_grade = BeltGrade.new user_id: user.id, belt_id: "8"
        belt_grade.save!

        # And an instructor qualification (likewise, a meaningless "unqualified" qualification for now, to be updated if and when the user gets new qualifications)
        instructor_qualification = InstructorQualification.new user_id: user.id, belt_grade_id: belt_grade.id, belt_id: "8", qualification_id: "1"
        instructor_qualification.save!

        if user.save
            session[:user_id] = user.id
            render json: {id: user.id}
        else
            render json: { errors: user.errors.full_messages }, status: 422
        end
    end

    def update
        authorize_user!
        user = User.find(params["id"])
        # Don't think we need to do the existing belt grade approach ala technique types, because we are not creating a new belt grade, just updating an old one; have commented out the following line just in case it is useful
        # existing_belt_grade = BeltGrade.Where(user_id: params["user_id"])[0]

        # Ensure that changed params are not null/empty and if they are, don't bother to update them, using if/else statements to catch this
        belt_grade = BeltGrade.find_by(user_id: user.id)
        if params["belt_id"].to_i.present?
            belt_grade.belt_id = params["belt_id"].to_i
        else
        end
        belt_grade.save!
        puts "These are the params", params
        instructor_qualification = InstructorQualification.find_by(user_id: user.id)
        if params.dig(:instructor_qualification, :qualification_id) # This is a useful way of checking for the presence of nested params
        # if params["instructor_qualification"]["qualification_id"].to_i.present?
            instructor_qualification.qualification_id = params["instructor_qualification"]["qualification_id"].to_i
        else
        end
        if params.dig(:instructor_qualification, :achieved_at)
            instructor_qualification.achieved_at = params["instructor_qualification"]["achieved_at"]
        else
        end
        instructor_qualification.save!
        if params["owns_gi"].present?
            user.owns_gi = params["owns_gi"]
        else    
        end
        if params["has_first_aid_qualification"].present?
            user.has_first_aid_qualification = params["has_first_aid_qualification"]
        else
        end
        if params["first_aid_achievement_date"].present?
            user.first_aid_achievement_date = params["first_aid_achievement_date"]
        else
        end
        user.save!
    end

    # def show (check if needed)
    #     if @user
    #     render(
    #     )
    #     else
    #         render(json: {error: "User Not Found"})
    #     end
    # end 



    private
    def user_params
        params.require(:user)
        .permit(
            :id,
            :first_name,
            :last_name,
            :email,
            :is_admin,
            :dues_paid,
            :owns_gi,
            :has_first_aid_qualification,
            :first_aid_achievement_date,
            :first_aid_expiry_date,
            :created_at,
            :updated_at
        )
    end
    
    def find_user
        @user ||= User.find params[:id]
    end

    def record_not_found
        render(
            json: { status:422, errors: {msg: "Record Not Found"} },
            status: 422
        )
    end
    

    def record_invalid(error)
        invalid_record = error.record_not_found
        # errors = invalid_record.errors.map do |field, message|
        #     {
        #         type: error.class.to_s,
        #         record_type: invalid_record.class.to_s,
        #         # field: field,
        #         message: message
        #     }
        # end
        render(
            json: { status: 422, errors:invalid_record }
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