# -------- BUILD STAGE --------
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /app
COPY . .

RUN mvn clean package -DskipTests

# -------- RUN STAGE --------
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

# Expose the port (Render will set this via environment variable)
EXPOSE ${PORT:-8081}

# Use shell form to allow environment variable substitution
ENTRYPOINT java -Dserver.port=${PORT:-8081} -jar app.jar