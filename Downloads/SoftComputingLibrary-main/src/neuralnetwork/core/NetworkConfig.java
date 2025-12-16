package neuralnetwork.core;

public class NetworkConfig {

    private double learningRate;
    private int epochs;
    private int batchSize;
    private boolean shuffle;

    public NetworkConfig(double learningRate, int epochs, int batchSize, boolean shuffle) {
        this.learningRate = learningRate;
        this.epochs = epochs;
        this.batchSize = batchSize;
        this.shuffle = shuffle;
    }

    public double getLearningRate() {
        return learningRate;
    }

    public int getEpochs() {
        return epochs;
    }

    public int getBatchSize() {
        return batchSize;
    }

    public boolean isShuffle() {
        return shuffle;
    }
}

