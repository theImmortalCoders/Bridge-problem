package pl.batormazur.multithreadingtest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MultithreadingTestApplication {
    public static void main(String[] args) {
        SpringApplication.run(MultithreadingTestApplication.class, args);
    }
}
