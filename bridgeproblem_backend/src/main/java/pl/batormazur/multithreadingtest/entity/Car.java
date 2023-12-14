package pl.batormazur.multithreadingtest.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class Car {
    private final String name;
    private final Source source;
    private final int processingTime;
    @Setter
    private State state;

}
