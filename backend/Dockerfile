# ========================================================
# Stage 1: Build the Application
# Use the official Maven image to compile and package the app
# ========================================================
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# 1. Copy pom.xml first to leverage Docker layer caching
COPY pom.xml .

# 2. Copy the source code
COPY src ./src

# 3. Build the JAR file (skip tests to save time during deployment)
RUN mvn clean package -DskipTests

# ========================================================
# Stage 2: Run the Application
# Use a lightweight JDK image to run the app
# ========================================================
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# 4. Copy only the built JAR file from the 'build' stage
# This keeps the final image size very small
COPY --from=build /app/target/*.jar app.jar

# 5. Expose the port (Render will listen to this)
EXPOSE 8080

# 6. Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]