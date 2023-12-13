package pl.batormazur.multithreadingtest.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CarAddRequest {
    private String name;
    private Source source;
    private int processingTime;
}
