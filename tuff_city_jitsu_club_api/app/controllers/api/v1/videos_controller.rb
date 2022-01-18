class Api::V1::VideosController < Api::ApplicationController
    before_action :authenticate_user!, except: [:index, :show]
    before_action :find_video, only: [:edit, :update, :destroy] # How about :show
    
    rescue_from(ActiveRecord:: RecordNotFound, with: :record_not_found)
    rescue_from(ActiveRecord:: RecordInvalid, with: :record_invalid)


    def index
        videos = Video.all.order(technique_id: :desc) # This should order the videos by beltcode
        render(json: videos, each_serializer: VideosSerializer) # Find out what should be in this serializer
    end

    def create
        video = Video.new video_params
        video.user = current_user

        # if question.save
        #     render json: { id: question.id }
        # else
        #     render(
        #         json: { errors: question.errors.messages },
        #         status: 422 # Unprocessable Entity
        #     )
        # end
        video.save!
        render json: {id: video.id}

    end

    def show
        # puts "Here are the video params", params["id"]
        # video = Video.find params["id"]
        # puts video
        # if video
        #     puts "Here is the video", video
        #     render(
        #         json: video
        #             )
        # else
        #     render(json: {error: "Video Not Found"})
        # end
        puts "These are the search parameters", params["id"]
        # technique_id = Technique.where("video_ids = ?", Video.ids).first.id
        video = Video.where("technique_id = ?", params["id"]) 

        puts "################# here are the videos", video

        render(
            json: video.as_json
        )

    end

    def destroy
        @video.destroy
        render(json: { status: 200 }, status: 200)
    end

    def edit
    end

    def update
        @video = Video.find_by id: params["video_id"] # Comment this out if it causes problems
        if @video.update video_params
            render json: { id: @video.id }
        else
            render(
                json: { errors: video.errors },
                status: 422 # Unprocessable Entity
            )
        end
    end

    def find
        puts "These are the search parameters", params["id"]
        # technique_id = Technique.where("video_ids = ?", Video.ids).first.id
        video = Video.where("technique_id = ?", params["id"]) 

        puts "################# here are the videos", video

        render(
            json: video.as_json
        )
    end

    # def where

    # end

    private 

    def video_params
        params.require(:video)
        .permit( # Replace these as appropriate
            :id,
            :canadian_version,
            :uk_version,
            :created_at,
            :updated_at,
            :technique_id
        )
    end
    
    def find_video
        @video ||= Video.find params[:id]
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