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
        String body = """
            {
              "username": "apitestuser6",
              "email": "apitestuser6@example.com",
              "password": "123456"
            }
            """;

        given()
                .header("Content-Type", "application/json")
                .body(body)
                .when()
                .post("/api/auth/signup")
                .then()
                .statusCode(200)
                .body(containsString("User registered successfully"));
    }

    @Test
    void loginShouldReturnToken() {
        String body = """
            {
              "usernameOrEmail": "apitestuser6",
              "password": "123456"
            }
            """;

        given()
                .header("Content-Type", "application/json")
                .body(body)
                .when()
                .post("/api/auth/login")
                .then()
                .statusCode(200)
                .body("token", notNullValue())
                .body("username", equalTo("test"));
    }
}