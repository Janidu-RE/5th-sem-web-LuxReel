package com.LuxReel.LuxReel.selenium;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class LoginSeleniumTest {

    private WebDriver driver;

    @BeforeEach
    public void setUp() {
        //headless mode for CI
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");

        // Set ChromeDriver path for CI
        if (System.getenv("CHROMEWEBDRIVER") != null) {
            System.setProperty("webdriver.chrome.driver", System.getenv("CHROMEWEBDRIVER") + "/chromedriver");
        }

        driver = new ChromeDriver(options);
    }

    @Test
    public void testLogin() {

        driver.get("http://localhost:5173/login");

        WebElement usernameInput = driver.findElement(By.id("username"));
        usernameInput.sendKeys("test");

        WebElement passwordInput = driver.findElement(By.id("password"));
        passwordInput.sendKeys("123456");

        WebElement loginButton = driver.findElement(By.id("loginButton"));
        loginButton.click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.urlToBe("http://localhost:5173/"));
        assertEquals("http://localhost:5173/", driver.getCurrentUrl());
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}