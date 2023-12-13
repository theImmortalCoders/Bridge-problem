package pl.batormazur.multithreadingtest;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
@AllArgsConstructor
public class BridgeController {
    private final BridgeService bridgeService;

    @GetMapping("/cars")
    public ResponseEntity<List<Car>> getCars() {
        return ResponseEntity.ok(bridgeService.getCars());
    }

    @GetMapping("/direction")
    public ResponseEntity<Source> getCurrentDrivingDirection() {
        return ResponseEntity.ok(bridgeService.getCurrentDrivingDirection());
    }

    @GetMapping("/max-cars")
    public ResponseEntity<Integer> getMaxCarsAmount() {
        return ResponseEntity.ok(bridgeService.getMaxCarsAmount());
    }

    @PostMapping("/add-car")
    public void addCar(@RequestBody CarAddRequest carRequest) {
        var car = new Car(carRequest.getName(), State.WAITING, carRequest.getSource(), carRequest.getProcessingTime());
        bridgeService.addToQueue(car);
    }

    @PostMapping("/max-cars")
    public void setMaxCars(@RequestBody int maxCarsAmount) {
        bridgeService.setMaxCarsAmount(maxCarsAmount);
    }
}
