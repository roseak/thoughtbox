require 'test_helper'

class UserTest < ActiveSupport::TestCase
  attr_reader :user

  def setup
    @user = User.create(email: "rose1@gmail.com", password: "password", password_confirmation: "password")
  end

  test "a user has an email" do
    assert_equal "rose1@gmail.com", user.email
  end
end
