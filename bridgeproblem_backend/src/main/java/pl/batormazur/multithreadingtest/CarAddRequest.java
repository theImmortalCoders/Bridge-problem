package pl.batormazur.multithreadingtest;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CarAddRequest {
    private String name;
    private Source source;
    private int timeMilliseconds;
}
