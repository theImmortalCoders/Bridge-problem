package pl.batormazur.multithreadingtest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import pl.batormazur.multithreadingtest.entity.Car;
import pl.batormazur.multithreadingtest.entity.Source;
import pl.batormazur.multithreadingtest.entity.State;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class BridgeServiceTest {
    private BridgeService bridgeService;

    @BeforeEach
    void setUp() {
        bridgeService = new BridgeService();
    }

    @Test
    void shouldChangeMaxCars() {
        bridgeService.setMaxCarsAmount(1);
        assertEquals(1, bridgeService.getMaxCarsAmount());
    }

    @Test
    void shouldProcessCarsBy2N() {
        int northCarsCount = 3;
        int southCarsCount = 3;
        List<Car> cars = createCars(northCarsCount, southCarsCount);
        cars.forEach(bridgeService::addToQueue);
        long startTimeMillis = System.currentTimeMillis();
        List<Car> processed = new ArrayList<>();
        while (System.currentTimeMillis() - startTimeMillis < 8000) {
            bridgeService.getCars()
                    .stream()
                    .filter(c -> c.getState().equals(State.PROCESSED))
                    .filter(c -> !processed.contains(c))
                    .forEach(processed::add);
        }
        assertEquals(cars.get(0), processed.get(0));
        assertEquals(cars.get(1), processed.get(1));
        assertEquals(cars.get(3), processed.get(2));
        assertEquals(cars.get(4), processed.get(3));
        assertEquals(cars.get(2), processed.get(4));
        assertEquals(cars.get(5), processed.get(5));
    }

    private List<Car> createCars(int northCarsCount, int southCarsCount) {
        List<Car> cars = new ArrayList<>();
        for (int i = 1; i <= northCarsCount; i++) {
            cars.add(new Car("carN" + i, Source.NORTH, 1000));
        }
        for (int i = 1; i <= southCarsCount; i++) {
            cars.add(new Car("carS" + i, Source.SOUTH, 1000));
        }
        return cars;
    }
}
