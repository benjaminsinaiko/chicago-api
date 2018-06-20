class V1::ServiceRequestsController < ApplicationController
  require "time"
  require "unirest"

  def index
    alderman_info = Unirest.get("https://data.cityofchicago.org/resource/7ia9-ayc2.json").body
    render json: alderman_info
  end
end
