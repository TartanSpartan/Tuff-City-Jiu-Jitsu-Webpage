Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # Because we are using the API ontrollers, we use namespace to interface them for routes
  root :controller => 'static', :action => '/' 
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :belt_grades
      get "/belt_grades_find", {to: "belt_grades#find"}
      resources :instructorqualifications
      resources :syllabi do
        get "/syllabi_full", {to: "syllabi#find_all_belts"}
        resources :belts do
          get "/syllabi_find", {to: "syllabi#get_syllabus_index_page_data"}
        end
        resources :mindmap
      end
      resources :belts
      get "/belts_find", {to: "belts#find"}
      resources :techniques
      get "/techniques_find", {to: "techniques#find"}
      get '/techniques/:id/edit', to: "syllabi#get_syllabus_index_page_data";
      resources :technique_types
      get "/technique_types_find", {to: "technique_types#find"}
      resources :videos do
        resources :urls, only: [:create, :destroy]
      end
      # Need to check if the following two lines should be "meshed" with the preceding three
      resources :videos
      get "/find_video/:id", {to: "videos#find"}
      resources :profiles
      resources :whatisjitsu
      resources :admin
      # resources :belts

      resource :session, only: [:create, :destroy]
      # -> api/v1/users
      resources :users, shallow: true, only: [:create, :new, :show, :index] do
        # -> api/v1/users/current
        get :current, on: :collection 
        # -> /api/v1/user/:id/current
      end
    end
  end
end

# redirect_to root_path # redirect to /

#     match "*unmatched_route", to: "application#not_found", via: :all