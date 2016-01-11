class AddConnectionToUsers < ActiveRecord::Migration
  def change
    add_reference :links, :user, index: true
    add_foreign_key :links, :users
  end
end
