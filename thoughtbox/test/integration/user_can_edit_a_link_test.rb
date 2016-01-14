require "test_helper"

class UserCanEditALinkTest < ActionDispatch::IntegrationTest
  def setup
    super
    use_javascript
  end

  def teardown
    super
    reset_driver
  end

  test "user can edit a link title" do
    skip
    user = User.create(email: "rose@gmail.com", password: "password")
    Link.create(title: "pizza", url: "http://pizza.com", user_id: user.id)

    visit login_path
    fill_in "Email", with: user.email
    fill_in "Password", with: "password"
    click_on "Login"

    title = first(:xpath, "//h5[@contenteditable='true']")
    title.set("pizza yum")
    title.native.send_keys(:return)
    assert page.has_content?("pizza yum")
  end

  test "user can edit a link url" do
    skip
    user = User.create(email: "rose@gmail.com", password: "password")
    Link.create(title: "pizza", url: "http://pizza.com", user_id: user.id)

    visit login_path
    fill_in "Email", with: user.email
    fill_in "Password", with: "password"
    click_on "Login"

    url = first(:xpath, "//p[@contenteditable='true']")
    url.set("http://www.almostdone.com")
    url.native.send_keys(:return)
    assert page.has_content?("http://www.almostdone.com")
  end
end
