require 'test_helper'

class LinkTest < ActiveSupport::TestCase
  attr_reader :user

  def setup
    @user = User.create(email: "rose@gmail.com", password: "password", password_confirmation: "password")
  end

  test "is valid with correct attributes" do
    link = user.links.create(title: "An Idea", url: "http://www.test.com")
    assert_equal "An Idea", link.title
  end

  test "is not valid without a correct url" do
    link = user.links.create(title: "Idear", url: "test.com")
    refute link.valid?
  end
end
