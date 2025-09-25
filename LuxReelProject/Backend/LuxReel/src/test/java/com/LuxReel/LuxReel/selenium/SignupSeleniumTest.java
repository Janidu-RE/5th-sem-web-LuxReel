package com.LuxReel.LuxReel.selenium;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class SignupSeleniumTest {

    @LocalServerPort
    private int port;

    private WebDriver driver;

    @BeforeEach
    public void setUp() {
        // Set up Chrome in headless mode for CI
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");

        // Set ChromeDriver path for CI (will be set by CI environment)
        if (System.getenv("CHROMEWEBDRIVER") != null) {
            System.setProperty("webdriver.chrome.driver", System.getenv("CHROMEWEBDRIVER") + "/chromedriver");
        }

        driver = new ChromeDriver(options);
    }

    @Test
    public void testSignup() throws InterruptedException {
        driver.get("http://localhost:5173/signup");

        WebElement usernameInput = driver.findElement(By.id("username"));
        usernameInput.sendKeys("testuser"+ System.currentTimeMillis());

        WebElement emailInput = driver.findElement(By.id("email"));
        emailInput.sendKeys("testuser"+ System.currentTimeMillis()+"@example.com");

        WebElement passwordInput = driver.findElement(By.id("password"));
        passwordInput.sendKeys("123456");

        WebElement confirmPasswordInput = driver.findElement(By.id("confirmPassword"));
        confirmPasswordInput.sendKeys("123456");

        WebElement signupButton = driver.findElement(By.id("signupButton"));
        signupButton.click();

        // Use WebDriverWait instead of Thread.sleep for better reliability
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));

        // Wait for alert to be present and accept it
        wait.until(ExpectedConditions.alertIsPresent());
        Alert alert = driver.switchTo().alert();
        alert.accept();

        // Wait for URL to change instead of using Thread.sleep
        wait.until(ExpectedConditions.urlToBe("http://localhost:5173/"));

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