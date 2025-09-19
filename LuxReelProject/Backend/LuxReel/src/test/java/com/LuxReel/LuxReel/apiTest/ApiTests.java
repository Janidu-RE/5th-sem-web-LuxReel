package com.LuxReel.LuxReel.apiTest;

import io.restassured.RestAssured;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class ApiTests {

    @Test
    void signupShouldReturn200AndSuccessMessage() {
        RestAssured.baseURI = "http://localhost:8080";

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
        RestAssured.baseURI = "http://localhost:8080";

        String body = """
            {
              "usernameOrEmail": "test",
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
