class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :logged_in
  helper_method :current_user

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def logged_in
    redirect_to login_path unless current_user
  end
end
