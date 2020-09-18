Feature: Reservation CRUD

  Scenario: Add new Reservation
    When we create a reservation
    Then the response should be the newly created object

  Scenario: Update Reservation
    Given reservation object
    When update the reservation
    Then reservation should be updated


