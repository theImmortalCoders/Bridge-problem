package pl.batormazur.multithreadingtest;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;
import pl.batormazur.multithreadingtest.entity.Car;
import pl.batormazur.multithreadingtest.entity.Source;
import pl.batormazur.multithreadingtest.entity.State;

import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class BridgeService {
    @Setter
    @Getter
    private int maxCarsAmount = 2;
    @Getter
    private Source currentDrivingSource;
    private final Queue<Car> cars = new ConcurrentLinkedQueue<>();
    private final Queue<Car> northQueue = new ConcurrentLinkedQueue<>();
    private final Queue<Car> southQueue = new ConcurrentLinkedQueue<>();
    private final ExecutorService executorService = Executors.newFixedThreadPool(2);

    public Queue<Car> getCars() {
        return cars;
    }

    public void addToQueue(Car car) {
        cars.add(car);
        if (car.getSource() == Source.NORTH) {
            northQueue.add(car);
            resetThread(northQueue);
            resetThread(southQueue);
        } else {
            southQueue.add(car);
            resetThread(southQueue);
            resetThread(northQueue);
        }
    }

    private void resetThread(Queue<Car> queue) {
        executorService.execute(() -> processQueue(queue));
    }

    private synchronized void processQueue(Queue<Car> queue) {
        for (int i = 0; i < maxCarsAmount && !queue.isEmpty(); i++) {
            var currentCar = queue.remove();
            if (currentCar.getState() == State.PROCESSED) continue;
            crossBridge(currentCar);
            notifyAll();
        }
    }

    private synchronized void crossBridge(Car currentCar) {
        currentCar.setState(State.PROCESSING);
        currentDrivingSource = currentCar.getSource();
        try {
            Thread.sleep(currentCar.getProcessingTime());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        currentCar.setState(State.PROCESSED);
        currentCar.setProcessedTimeStamp(System.currentTimeMillis());
    }
}
