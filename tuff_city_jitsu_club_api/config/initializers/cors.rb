# config/initalizers/cors.rb

# Rails.application.config.middleware.insert_before 0, Rack:Cors do
#     allow do
#         origins 'localhost:5500', '127.0.0.1:5500' # you can add 'google.ca', or if you're in production, you can put your app here
#         # Origins '*' allows everyone to access, which is probably not a good idea!
#         # resource  '*', headers: :any, methods: [:get, :post, :patch, :put]
#         resource(
#             'api/v1/*', # this only allows cors requests to a path that looks like /api
#             headers: :any, # allow requests to contain any headers
#             credentials: true, # allows us to send cookies through CORS requests
#             methods: [:get, :post, :delete, :patch, :put, :options] # options verb is being used under the hood for cors to work, 
#         )
#     end
# end

Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins '127.0.0.1:5500', 'localhost:5500' # whitelist domains
      resource(
        '/api/*', # Limit requests to paths that look like /api
        headers: :any, # All the requests to contain any headers
        credentials: true, # Because we're sending cookies with CORS we must add this flag
        methods: [:get, :post, :patch, :put, :options, :delete, :head] # Allow these http verbs
      )
    end
end