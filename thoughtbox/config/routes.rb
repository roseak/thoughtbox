Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :links, only: [:index, :create, :update], defaults: { format: 'json' }
    end
  end

  root 'links#index'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  resources :users, only: [:new, :create]
  resources :links, only: [:index, :create]
end
