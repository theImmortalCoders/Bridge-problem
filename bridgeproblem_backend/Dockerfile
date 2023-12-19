FROM openjdk:17-jdk-alpine
COPY target/BridgeProblemBackend-0.0.1-SNAPSHOT.jar app.jar
LABEL authors="Marcin"
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]