class Api::V1::LinksController < ApplicationController
  respond_to :json

  def index
    respond_with current_user.links
  end

  def update
    @link = current_user.links.update(params[:id], link_params)
    respond_with @link, json: @link
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
