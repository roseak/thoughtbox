class LinksController < ApplicationController
  def index
    @link = Link.new
    @links = current_user.links
  end

  def create
    @link = Link.new(user_link_params)
    if @link.save
      redirect_to links_path
    else
      flash[:errors] = "Oops! Make sure your url is in the correct format!"
      redirect_to links_path
    end
  end

  private

  def link_params
    params.require(:link).permit(:title, :url, :read)
  end

  def user_link_params
    completed_params = link_params
    completed_params[:user_id] = current_user.id
    completed_params
  end
end
