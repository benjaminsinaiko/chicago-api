Rails.application.routes.draw do
  namespace :v1 do
    get "/alderman" => "service_requests#index"
  end
end
