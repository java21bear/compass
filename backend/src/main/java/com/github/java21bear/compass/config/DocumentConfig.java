package com.github.java21bear.compass.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.github.java21bear.compass.service.DocumentService;

@Configuration
public class DocumentConfig {
  @Bean
  CommandLineRunner init(DocumentService documentService) {
    return args -> documentService.loadPdf();
  }
}
