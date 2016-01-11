require "test_helper"

class UserCanSignUpTest < ActionDispatch::IntegrationTest
  test "with valid attributes" do
    visit root_path
    assert_equal "/login", current_path
    assert_equal 200, page.status_code
    assert page.has_content?("sign up")

    click_on "here"
    assert_equal "/users/new", current_path

    fill_in 'user[email]', with: 'rose@gmail.com'
    fill_in 'user[password]', with: 'password'
    fill_in 'user[password_confirmation]', with: 'password'
    click_on 'Sign Up'

    assert_equal "/links", current_path
    assert page.has_content?("ThoughtBox")
  end
end
