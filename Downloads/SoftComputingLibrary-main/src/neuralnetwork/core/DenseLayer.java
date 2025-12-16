package neuralnetwork.core;

import neuralnetwork.activations.ActivationFunction;
import neuralnetwork.initialization.WeightInitializer;
import neuralnetwork.optimizers.Optimizer;
import neuralnetwork.util.MatrixUtils;

public class DenseLayer extends Layer {

    private double[][] weights;
    private double[] biases;
    private ActivationFunction activation;
    private Optimizer optimizer;
    private double[] lastInput;
    private double[] lastZ;

    public DenseLayer(int inputSize, int outputSize, ActivationFunction activation, WeightInitializer initializer, Optimizer optimizer) {
        super(inputSize, outputSize);
        this.activation = activation;
        this.weights = new double[outputSize][inputSize];
        this.biases = new double[outputSize];
        this.optimizer = optimizer;
        initializer.initialize(weights, inputSize, outputSize);
    }

    @Override
    public double[] forward(double[] input) {
        lastInput = input.clone();
        double[] z = MatrixUtils.add(MatrixUtils.multiply(weights, input), biases);
        lastZ = z.clone();
        double[] a = new double[z.length];
        for (int i = 0; i < z.length; i++) {
            a[i] = activation.activate(z[i]);
        }
        return a;
    }

    @Override
    public double[] backward(double[] outputGradient, double learningRate) {
        // Compute dA/dZ
        double[] dZ = new double[outputGradient.length];
        for (int i = 0; i < outputGradient.length; i++) {
            dZ[i] = outputGradient[i] * activation.derivative(lastZ[i]);
        }

        // Compute gradients
        double[][] dW = new double[outputSize][inputSize];
        for (int i = 0; i < outputSize; i++) {
            for (int j = 0; j < inputSize; j++) {
                dW[i][j] = dZ[i] * lastInput[j];
            }
        }
        double[] dB = dZ.clone();

        // Update using optimizer
        optimizer.update(weights, dW, learningRate);
        optimizer.update(biases, dB, learningRate);

        // Compute input gradient
        double[] inputGradient = new double[inputSize];
        double[][] weightsT = MatrixUtils.transpose(weights);
        inputGradient = MatrixUtils.multiply(weightsT, dZ);

        return inputGradient;
    }
}

