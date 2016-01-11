class Api::V1::LinksController < ApplicationController
  respond_to :json

  def index
    respond_with current_user.links
  end

  # def create
  #   respond_with current_user.links.create(user_link_params), location: nil
  # end


  def update
  end

  def link_params
    params.require(:link).permit(:title, :url, :read)
  end

  def user_link_params
    completed_params = link_params
    completed_params[:user_id] = current_user.id
    completed_params
  end
end
