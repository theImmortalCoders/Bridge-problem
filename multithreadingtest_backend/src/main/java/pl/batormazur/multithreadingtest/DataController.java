package pl.batormazur.multithreadingtest;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class DataController {
    private final List<Ship> ships = new ArrayList<>();
    private final ExecutorService executorService = Executors.newFixedThreadPool(5);

    @GetMapping("/ships")
    public List<Ship> getWaitingShips() {
        return ships;
    }
    @GetMapping("/generate-ships")
    public void generateShips() {
        Random random = new Random();
        Ship ship = new Ship();
        ship.setId(UUID.randomUUID());
        ship.setState(State.WAITING);
        ship.setProcessingTime(random.nextInt(5000) + 1000);
        ships.add(ship);
    }
    @Scheduled(fixedDelay = 100)
    public void processWaitingShips() {
        var waitingShips = new ArrayList<>(ships.stream().filter(s -> s.getState().equals(State.WAITING)).toList());
        if (!waitingShips.isEmpty()) {
            Ship ship = waitingShips.get(0);
            executorService.submit(() -> {
                processShip(ship);
            });
        }
    }
    private void processShip(Ship ship) {
        ship.setState(State.PROCESSING);
        try {
            Thread.sleep(ship.getProcessingTime());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        ship.setState(State.PROCESSED);
    }
}
