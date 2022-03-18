class ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'
end

# Use this class of Rails action to do things like mail a user with a prompt to click back onto the page to authorise their account generation