package com.deepwork.ai;

import org.jspecify.annotations.NonNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    // Option 1: Using WebMvcConfigurer (your current approach - improved)
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns(
                                "https://deepwork-ai-one.vercel.app",  // Specific frontend URL
                                "http://localhost:3000",               // Local development
                                "http://localhost:5173"                // Vite default
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                        .allowedHeaders("*")
                        .allowCredentials(true)  // Changed to true if using auth
                        .maxAge(3600);           // Cache preflight requests
            }
        };
    }

//    // Option 2: Alternative using CorsFilter (more explicit)
//    @Bean
//    public CorsFilter corsFilter() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        CorsConfiguration config = new CorsConfiguration();
//
//        config.setAllowCredentials(true);
//        config.addAllowedOriginPattern("https://deepwork-ai-one.vercel.app");
//        config.addAllowedOriginPattern("http://localhost:*");
//        config.addAllowedHeader("*");
//        config.addAllowedMethod("*");
//        config.addExposedHeader("Authorization"); // If using JWT
//
//        source.registerCorsConfiguration("/**", config);
//        return new CorsFilter(source);
//    }
}





















//package com.deepwork.ai;
//
//import org.jspecify.annotations.NonNull;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.*;
//
//@Configuration
//public class CorsConfig {
//
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(@NonNull CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOriginPatterns("*")   // 🔥 IMPORTANT
//                        .allowedMethods("*")
//                        .allowedHeaders("*")
//                        .allowCredentials(false);
//            }
//        };
//    }
//}