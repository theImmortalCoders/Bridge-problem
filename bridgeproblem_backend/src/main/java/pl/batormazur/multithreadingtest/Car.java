package pl.batormazur.multithreadingtest;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Car {
    private final String name;
    private State state;
    private final Source source;
    private final int processingTime;

    public void setState(State state) {
        this.state = state;
    }
}
