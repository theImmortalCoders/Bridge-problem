package pl.batormazur.multithreadingtest.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
public class Car {
    private final String name;
    private final Source source;
    private final int processingTime;
    @Setter
    private State state = State.WAITING;
    @Setter
    private long processedTimeStamp;

    public Car(String name, Source source, int processingTime) {
        this.name = name;
        this.source = source;
        this.processingTime = processingTime;
    }
}
