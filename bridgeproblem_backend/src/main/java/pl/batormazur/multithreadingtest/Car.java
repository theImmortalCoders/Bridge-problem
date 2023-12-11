package pl.batormazur.multithreadingtest;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class Car {
    private String name;
    private State state;
    private Source source;
    private int processingTime;

    public void setState(State state) {
        this.state = state;
    }
}
