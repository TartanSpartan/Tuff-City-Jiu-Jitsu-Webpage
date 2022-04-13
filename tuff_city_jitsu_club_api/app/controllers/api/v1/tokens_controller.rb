class Api::V1::TokensController < ApplicationController
    def create
        # 1. Find the user with the email from the params
        user = User.find_by(email: params[:email])

        # 2. Verify the user's password
        if user&.authenticate(params[:password])
            render json: {
            jwt: encode_token({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            })
            }
        else
            head :not_found
        end
    end

    private

    def encode_token(payload = {}, exp = 24.hours.from_now)
        # JWT once issued cannot be revoked therefore it's best practice
        # to implement an expiration date. `exp` will act as the expiration
        # in the payload.
        payload[:exp] = exp.to_i
        JWT.encode(payload, Rails.application.secrets.secret_key_base)
    end
end