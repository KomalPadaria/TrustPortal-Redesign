@login

Feature: RDTS001: Verify login functionality

	Scenario: RDTC1001: Check login with valid credentials
		Given Valid login credentials
		When User click Login
		Then User should login successfully and redirect to Dashboard screen

	Scenario: RDTC1002: Check login with valid email(togglecase) and valid password
		Given Valid login credentials with toggle case
		When User click Login
		Then User should login successfully and redirect to Dashboard screen

	Scenario: RDTC1003: Check login with invalid credentials
		Given Invalid login credentials
		When User click Login
		Then User should not be able to login and user must receive toast message: "Username or password incorrect"

	 Scenario: RDTC1007: Check if user is able to navigate to all menu options after login
		Given Valid login credentials
		When User click Login
		Then User able to navigate to all menu options after login

	Scenario: RDTC1008: Check if user is able to logout
		Given Valid login credentials
		When User click Login
		Then User able to logout