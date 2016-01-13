require "test_helper"

class UserCanLogoutTest < ActionDispatch::IntegrationTest
  attr_reader :user

  def setup
    @user = User.create(email: "rose@gmail.com", password: "password")
  end

  test "with valid attributes" do
    visit root_path
    assert_equal "/login", current_path

    fill_in "Email", with: user.email
    fill_in "Password", with: "password"
    click_on "Login"

    assert page.has_content?("Logout")
    click_link "Logout"
    assert_equal "/login", current_path
    assert page.has_content?("Login")
  end
end
