package neuralnetwork.core;

public abstract class Layer {

    protected int inputSize;
    protected int outputSize;

    public Layer(int inputSize, int outputSize) {
        this.inputSize = inputSize;
        this.outputSize = outputSize;
    }

    // Forward pass
    public abstract double[] forward(double[] input);

    // Backward pass
    public abstract double[] backward(double[] outputGradient, double learningRate);

    public int getInputSize() {
        return inputSize;
    }

    public int getOutputSize() {
        return outputSize;
    }
}

