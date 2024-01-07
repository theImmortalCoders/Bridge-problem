package pl.batormazur.multithreadingtest;

import lombok.Getter;
import org.springframework.stereotype.Service;
import pl.batormazur.multithreadingtest.entity.Car;
import pl.batormazur.multithreadingtest.entity.Source;
import pl.batormazur.multithreadingtest.entity.State;

import java.util.Optional;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

@Service
public class BridgeService {
    @Getter
    private int maxCarsAmount = 2;
    @Getter
    private Source currentDrivingSource = Source.NORTH;
    @Getter
    private final Queue<Car> cars = new ConcurrentLinkedQueue<>();
    private final Queue<Car> northQueue = new ConcurrentLinkedQueue<>();
    private final Queue<Car> southQueue = new ConcurrentLinkedQueue<>();
    private Thread southThread = new Thread(()->processQueue(southQueue));
    private Thread northThread = new Thread(()->processQueue(northQueue));
    public void addToQueue(Car car) {
        cars.add(car);
        Optional.of(car.getSource())
                .filter(s->s.equals(Source.NORTH))
                .ifPresentOrElse(v->northQueue.add(car), ()->southQueue.add(car));
    }
    public void runThreads(){
        if(!northQueue.isEmpty() && !northThread.isAlive()){
            northThread = new Thread(()->processQueue(northQueue));
            northThread.start();
        }
        else if(!southQueue.isEmpty() && !southThread.isAlive()){
            southThread = new Thread(()->processQueue(southQueue));
            southThread.start();
        }
    }
    public void deleteProcessed() {
        var toRemove = cars.stream()
                .filter(c -> c.getState().equals(State.PROCESSED))
                .filter(c -> System.currentTimeMillis() - c.getProcessedTimeStamp() > 10000)
                .toList();
        if (!toRemove.isEmpty())
            cars.removeAll(toRemove);
    }
    public void setMaxCarsAmount(int maxCarsAmount) {
        if(maxCarsAmount > 0){
            this.maxCarsAmount = maxCarsAmount;
        }
    }
    private synchronized void processQueue(Queue<Car> queue) {
        for (int i = 0; i < maxCarsAmount && !queue.isEmpty(); i++) {
            var currentCar = queue.remove();
            currentDrivingSource = currentCar.getSource();
            crossBridge(currentCar);
        }
    }
    private synchronized void crossBridge(Car currentCar) {
        currentCar.setState(State.PROCESSING);
        try {
            Thread.sleep(currentCar.getProcessingTime());
        } catch (InterruptedException e) {
            System.out.println(e.getMessage());
        }
        currentCar.setState(State.PROCESSED);
        currentCar.setProcessedTimeStamp(System.currentTimeMillis());
    }
}