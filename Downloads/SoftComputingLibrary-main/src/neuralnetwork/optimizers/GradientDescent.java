package neuralnetwork.optimizers;

import neuralnetwork.util.MatrixUtils;

public class GradientDescent implements Optimizer {

    @Override
    public void update(double[][] weights, double[][] gradients, double learningRate) {
        double[][] scaledGradients = MatrixUtils.scalarMultiply(gradients, learningRate);
        double[][] newWeights = MatrixUtils.add(weights, MatrixUtils.scalarMultiply(scaledGradients, -1));
        // Copy back
        for (int i = 0; i < weights.length; i++) {
            for (int j = 0; j < weights[0].length; j++) {
                weights[i][j] = newWeights[i][j];
            }
        }
    }

    @Override
    public void update(double[] biases, double[] gradients, double learningRate) {
        for (int i = 0; i < biases.length; i++) {
            biases[i] -= learningRate * gradients[i];
        }
    }
}

