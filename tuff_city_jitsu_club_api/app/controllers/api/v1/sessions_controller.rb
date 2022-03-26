class Api::V1::SessionsController < Api::ApplicationController
    def create
        user = User.find_by(email: params[:email])
        puts params[:email]
        puts user.id
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            puts session[:user_id]
            render( 
                json: { 
                status: 200,
                logged_in: true,
                user: user
             }
            )
        else
            render(
                json: { status: 404 },
                status: 404
            )
        end
    end

    def destroy
        session[:user_id] = nil
        render(json: { status: 200}, status: 200 )
    end

    def googleAuth
        # Get access tokens from the google server
        access_token = request.env["omniauth.auth"]
        user = User.from_omniauth(access_token)
        log_in(user)
        # Access_token is used to authenticate request made from the rails application to the google server
        # user.google_token = access_token.credentials.token
        # Refresh_token to request new access_token
        # Note: Refresh_token is only sent once during the first request
        refresh_token = access_token.credentials.refresh_token
        user.google_refresh_token = refresh_token if refresh_token.present?
        user.save
        redirect_to root_path
      end

end