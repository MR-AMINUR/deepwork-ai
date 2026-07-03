package com.deepwork.ai.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;

@Configuration
@Profile("prod")
public class DatabaseConfig {

    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource")
    public DataSourceProperties dataSourceProperties(@Value("${DATABASE_URL:}") String databaseUrl) {
        DataSourceProperties properties = new DataSourceProperties();
        
        if (databaseUrl != null && !databaseUrl.isEmpty()) {
            // Handle Render's database URL format
            // Render provides: postgres:// or postgresql://
            // We need: jdbc:postgresql://
            
            String jdbcUrl = databaseUrl;
            
            if (databaseUrl.startsWith("postgres://") && !databaseUrl.startsWith("jdbc:")) {
                jdbcUrl = databaseUrl.replace("postgres://", "jdbc:postgresql://");
                System.out.println("✅ Auto-converted Render DATABASE_URL: postgres:// → jdbc:postgresql://");
            } else if (databaseUrl.startsWith("postgresql://") && !databaseUrl.startsWith("jdbc:")) {
                jdbcUrl = "jdbc:" + databaseUrl;
                System.out.println("✅ Auto-converted DATABASE_URL: postgresql:// → jdbc:postgresql://");
            }
            
            properties.setUrl(jdbcUrl);
        }
        
        return properties;
    }

    @Bean
    @Primary
    public DataSource dataSource(DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().build();
    }
}
