package pl.batormazur.multithreadingtest;

import org.springframework.stereotype.Service;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

@Service
public class BridgeService {
    private static final Object lock = new Object();
    private static List<Car> northQueue = new ArrayList<>();
    private static List<Car> southQueue = new ArrayList<>();
    private static int carsOnBridge = 0;

    public void process(List<Car> cars) {
        processQueue(cars, Source.NORTH, northQueue);
        processQueue(cars, Source.SOUTH, southQueue);
    }

    private void processQueue(List<Car> cars, Source source, List<Car> queue) {
        cars.parallelStream()
                .filter(car -> car.getState().equals(State.WAITING) && car.getSource().equals(source))
                .forEach(car->{
                    queue.add(car);
                    car.setPosition(queue.indexOf(car));
                });
        if (!queue.isEmpty()) {
            Thread carThread = new Thread(() -> crossBridge(source));
            carThread.start();
            try {
                carThread.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    private void crossBridge(Source direction) {
        List<Car> currentQueue = (direction.equals(Source.NORTH)) ? northQueue : southQueue;
        while (!currentQueue.isEmpty()) {
            synchronized (lock) {
                while (carsOnBridge > 0) {
                    try {
                        lock.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                Car currentCar = currentQueue.remove(0);
                currentCar.setState(State.PROCESSING);
                System.out.println(currentCar + " from " + direction + " is crossing the bridge.");
                carsOnBridge++;
                try {
                    Thread.sleep(currentCar.getProcessingTime());
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                carsOnBridge--;
                currentCar.setState(State.PROCESSED);
                //currentQueue.remove(currentCar);
                System.out.println(currentCar + " from " + direction + " has crossed the bridge.");
                lock.notifyAll();
            }
        }
    }
}
