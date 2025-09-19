package com.LuxReel.LuxReel.selenium;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class SignupSeleniumTest {

    @LocalServerPort
    private int port;

    private WebDriver driver;

    @BeforeEach
    public void setUp() {
        driver = new ChromeDriver();
    }

    @Test
    public void testSignup() throws InterruptedException {
        driver.get("http://localhost:5173/signup");




        WebElement usernameInput = driver.findElement(By.id("username"));
        usernameInput.sendKeys("testuser11");

        WebElement emailInput = driver.findElement(By.id("email"));
        emailInput.sendKeys("testuser11@example.com");

        WebElement passwordInput = driver.findElement(By.id("password"));
        passwordInput.sendKeys("123456");

        WebElement confirmPasswordInput = driver.findElement(By.id("confirmPassword"));
        confirmPasswordInput.sendKeys("123456");

        WebElement signupButton = driver.findElement(By.id("signupButton"));
        signupButton.click();

        Thread.sleep(1000);
        Alert alert = driver.switchTo().alert();
        alert.accept(); //

        Thread.sleep(2000);


        String currentUrl = driver.getCurrentUrl();
        assertEquals("http://localhost:5173/", currentUrl);


    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
