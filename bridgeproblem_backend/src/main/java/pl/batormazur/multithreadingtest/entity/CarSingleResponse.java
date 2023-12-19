package pl.batormazur.multithreadingtest.entity;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CarSingleResponse {
    private final String name;
    private final Source source;
    private final int processingTime;
    private State state;

    public static CarSingleResponse map(Car car) {
        return new CarSingleResponseBuilder()
                .name(car.getName())
                .source(car.getSource())
                .processingTime(car.getProcessingTime())
                .state(car.getState())
                .build();
    }
}
