package com.LuxReel.LuxReel.config;

import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import com.LuxReel.LuxReel.LuxReelApplication;

@CucumberContextConfiguration
@SpringBootTest(classes = LuxReelApplication.class)
public class CucumberSpringConfiguration {
}
