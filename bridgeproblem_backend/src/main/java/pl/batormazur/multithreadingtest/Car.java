package pl.batormazur.multithreadingtest;

import lombok.Getter;

@Getter
public class Car {
    private final String name;
    private State state;
    private final Source source;
    private final int processingTime;
    private int position;

    public Car(String name, State state, Source source, int processingTime) {
        this.name = name;
        this.state = state;
        this.source = source;
        this.processingTime = processingTime;
    }

    public void setState(State state) {
        this.state = state;
    }

    public void setPosition(int position) {
        this.position = position;
    }
}
