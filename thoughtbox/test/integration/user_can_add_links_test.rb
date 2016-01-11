require "test_helper"

class UserCanAddLinksTest < ActionDispatch::IntegrationTest
  attr_reader :user

  def setup
    @user = User.create(email: "rose@gmail.com", password: "password", password_confirmation: "password")
  end

  test "with valid attributes" do
    visit root_path

    fill_in "Email", with: user.email
    fill_in "Password", with: "password"
    click_on "Login"

    assert_equal "/links", current_path

    fill_in "Title", with: "pizza"
    fill_in "Url", with: "http://www.pizza.com"
    click_on "Submit"
  end
end
