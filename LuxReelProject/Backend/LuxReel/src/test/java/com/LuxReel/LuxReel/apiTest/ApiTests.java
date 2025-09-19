package com.LuxReel.LuxReel.apiTest;

import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class ApiTests {

    @LocalServerPort
    private int port;

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
        RestAssured.baseURI = "http://localhost";
    }

    @Test
    void signupShouldReturn200AndSuccessMessage() {
        // Use a unique username for each test run to avoid conflicts
        String uniqueUsername = "testuser_" + System.currentTimeMillis();

        String body = String.format("""
            {
              "username": "%s",
              "email": "%s@example.com",
              "password": "123456"
            }
            """, uniqueUsername, uniqueUsername);

        given()
                .header("Content-Type", "application/json")
                .body(body)
                .when()
                .post("/api/auth/signup")
                .then()
                .log().all()  // Add this to see the response details
                .statusCode(200)
                .body(containsString("User registered successfully"));
    }

    @Test
    void loginShouldReturnToken() {
        // First create a user to login with
        String uniqueUsername = "loginuser_" + System.currentTimeMillis();

        String signupBody = String.format("""
            {
              "username": "%s",
              "email": "%s@example.com",
              "password": "123456"
            }
            """, uniqueUsername, uniqueUsername);

        given()
                .header("Content-Type", "application/json")
                .body(signupBody)
                .when()
                .post("/api/auth/signup")
                .then()
                .statusCode(200);

        // Now try to login with the same credentials
        String loginBody = String.format("""
            {
              "usernameOrEmail": "%s",
              "password": "123456"
            }
            """, uniqueUsername);

        given()
                .header("Content-Type", "application/json")
                .body(loginBody)
                .when()
                .post("/api/auth/login")
                .then()
                .statusCode(200)
                .body("token", notNullValue())
                .body("username", equalTo(uniqueUsername));
    }
}