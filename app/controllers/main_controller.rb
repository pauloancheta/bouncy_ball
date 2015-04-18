class MainController < ApplicationController
  def index
    @leaderboards = Leaderboard.all.order('score DESC').limit(10)
  end
end