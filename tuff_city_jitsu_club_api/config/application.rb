require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module TuffCityJitsuClubApi
  class Application < Rails::Application
    config.action_controller.default_protect_from_forgery = true

    # Initialize configuration defaults for originally generated Rails version.
    
    # This block doesn't seem to work, try to fix it if it's required for admin actions

    config.load_defaults 6.1
    
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '127.0.0.1:5500', 'localhost:5500' # whitelist domains
        resource(
          '/api/*', # Limit requests to paths that look like /api
          headers: :any, # All the requests to contain any headers
          credentials: true, # Because we're sending cookies with CORS we must add this flag
          methods: [:get, :post, :patch, :put, :options, :delete] # Allow these http verbs
        )
      end
    end

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
    
    # Uncomment out the following two lines if they are required for authorisation
    # config.middleware.use ActionDispatch::Cookies   
    # config.middleware.use ActionDispatch::Session::CookieStore
  end
end

module AuthBackend
  class Application < Rails::Application

  end
end
