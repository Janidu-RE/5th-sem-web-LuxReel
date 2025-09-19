Feature: Add a new movie
  As an admin
  I want to add a new movie
  So that it is available in the movie list

  Scenario: Successfully adding a movie
    Given the movie list is empty
    When I add a movie with title "Inception" and category "now_showing" and rating 8.8
    Then the movie list should contain the movie "Inception"
