package pl.batormazur.multithreadingtest;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class BridgeService {
    @Getter
    private List<Car> cars = new ArrayList<>();
    private final Object lock = new Object();
    private final Queue<Car> northQueue = new ConcurrentLinkedQueue<>();
    private final Queue<Car> southQueue = new ConcurrentLinkedQueue<>();
    @Setter
    @Getter
    private int maxCarsAmount = 2;
    @Getter
    private Source currentDrivingDirection;
    private final ExecutorService executorService = Executors.newFixedThreadPool(2);

    public void process(Queue<Car> queue) {
        executorService.execute(() -> processQueue(queue));
    }

    public void addToQueue(Car car) {
        cars.add(car);
        if (car.getSource() == Source.NORTH) {
            northQueue.add(car);
            process(northQueue);
            process(southQueue);
        } else {
            southQueue.add(car);
            process(southQueue);
            process(northQueue);
        }
    }

    private void processQueue(Queue<Car> queue) {
        synchronized (lock) {
            for (int i = 0; i < maxCarsAmount; i++) {
                if (queue.isEmpty()) {
                    return;
                }
                Car currentCar = queue.remove();
                if (currentCar.getState().equals(State.PROCESSED)) {
                    continue;
                }
                currentCar.setState(State.PROCESSING);
                currentDrivingDirection = currentCar.getSource();
                try {
                    Thread.sleep(currentCar.getProcessingTime());
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                currentCar.setState(State.PROCESSED);
                lock.notifyAll();
            }
        }
    }
}
