package neuralnetwork.optimizers;

public interface Optimizer {

    void update(double[][] weights, double[][] gradients, double learningRate);
    void update(double[] biases, double[] gradients, double learningRate);
}

