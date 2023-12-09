package pl.batormazur.multithreadingtest;

import lombok.Data;

import java.util.UUID;
enum State{
    WAITING, PROCESSING, PROCESSED
}
@Data
public class Ship {

    private UUID id;
    private State state;
    private int processingTime;

}
