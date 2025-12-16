package neuralnetwork.core;

import java.util.List;

public class TrainingResult {

    private double finalLoss;
    private List<Double> lossHistory;

    public TrainingResult(double finalLoss, List<Double> lossHistory) {
        this.finalLoss = finalLoss;
        this.lossHistory = lossHistory;
    }

    public double getFinalLoss() {
        return finalLoss;
    }

    public List<Double> getLossHistory() {
        return lossHistory;
    }
}

