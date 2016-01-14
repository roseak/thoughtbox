require "test_helper"

class UserCanChangeReadStatusTest < ActionDispatch::IntegrationTest
  def setup
    super
    use_javascript
  end

  def teardown
    super
    reset_driver
  end

  test "user can change read status to true" do
    skip
    user = User.create(email: "rose@gmail.com", password: "password")
    Link.create(title: "pizza", url: "http://pizza.com", user_id: user.id)

    visit root_path
    click_on "Log In"
    fill_in "Email address", with: user.email_address
    fill_in "Password", with: user.password
    click_on "submit"

    click_on "Mark As Read"

    wait_for_ajax

    assert page.has_css?('read-true')
  end
end
