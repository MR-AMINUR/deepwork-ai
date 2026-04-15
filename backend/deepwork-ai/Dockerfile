# Use Java 21 runtime
FROM eclipse-temurin:21-jdk

# Set working directory
WORKDIR /app

# Copy jar file
COPY target/deepwork-ai-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8081

# Run app
ENTRYPOINT ["java", "-jar", "app.jar"]