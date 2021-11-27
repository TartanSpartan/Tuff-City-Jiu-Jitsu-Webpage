class Api::ApplicationController < ActionController::Base

    skip_before_action(:verify_authenticity_token)

    rescue_from StandardError, with: :standard_error
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    # Now that we have those here, do we need them anywhere else?

    # To send a json error message when a user types in, for example: localhost:3000/api/v1/wrongthing
    def not_found
        render(
          json: {
            errors: [{
              type: "Not Found"
            }]
          },
          status: :not_found #alias for 404 in rails
        )
    end


    helper_method(:current_user)

    def current_user
        @current_user ||= User.find_by(id: session[:user_id])
    end


    # def authenticate_user!
    #     unless user_signed_in?
    #         flash[:danger] = "You must sign in or sign up first."
    #         redirect_to new_session_path
    #     end
    # end

    # def user_signed_in?
    #     current_user.present?
    # end
    # helper_method :user_signed_in?

    private
    def authenticate_user!
      unless current_user.present?
        render(
          json: { status: 401 },
          status: 401, # Unauthorized
        )
      end
    end

    protected
    # protected is like a private except that it prevents
    # descendent classes from using protected methods
  
  
    def record_invalid(error)
      # Our object should look something like this:
      # {
      #   errors: [
      #     {
      #       type: "ActiveRecord::RecordInvalid",
      #       record_typeL "Question",
      #       field: "body",
      #       message: '...'
      #     }
      #   ]
      # }
      invalid_record = error.record
      errors = invalid_record.errors.map do |field, message|
        {
          type: error.class.to_s, # need it in string format
          record_type: invalid_record.class.to_s,
          field: field,
          message: message
        }
      end
      render(
        json: {status: 422, errors: errors },
        status: 422 # alias is unprocessable_entity
      )
    end
  
    def record_not_found(error)
      render(
        status: 404,
        json: {
          status: 404,
          errors: [{
            type: error.class.to_s,
            message: error.message
            }]
          }
        )
    end
  
    def standard_error(error)
        #When we rescue an error, we prevent our program from
        #doing what it would normally do in a crash, such as logging
        #the details and the backtrace.  It's important to always log this
        #information when rescuing a general type
  
        #Use the logger.error method with an error's message to 
        #log the error details again
  
        logger.error error.full_message
  
        render(
          status:500,
          json:{
            status:500, #alias :internal_server_error
            errors:[{
              type: error.class.to_s,
              message: error.message
            }]
          }
        )
    end

end