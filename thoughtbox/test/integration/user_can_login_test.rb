require "test_helper"

class UserCanLoginTest < ActionDispatch::IntegrationTest
  attr_reader :user

  def setup
    @user = User.create(email: "rose@gmail.com", password: "password", password_confirmation: "password")
  end

  test "with valid attributes" do
    visit root_path
    assert_equal "/login", current_path

    fill_in "Email", with: user.email
    fill_in "Password", with: "password"
    click_on "Login"

    assert_equal "/links", current_path
  end
end
