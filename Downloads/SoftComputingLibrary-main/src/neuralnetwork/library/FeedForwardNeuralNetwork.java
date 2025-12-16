package neuralnetwork.library;

import neuralnetwork.core.Layer;
import neuralnetwork.core.NetworkConfig;
import neuralnetwork.core.TrainingResult;
import neuralnetwork.loss.LossFunction;
import neuralnetwork.util.DataHandler;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class FeedForwardNeuralNetwork extends NeuralNetwork {

    private List<Layer> layers;
    private LossFunction lossFunction;
    private NetworkConfig config;

    public FeedForwardNeuralNetwork(NetworkConfig config, LossFunction lossFunction) {
        this.config = config;
        this.lossFunction = lossFunction;
        this.layers = new ArrayList<>();
    }

    public void addLayer(Layer layer) {
        layers.add(layer);
    }

    public double[] predict(double[] input) {
        double[] output = input;
        for (Layer layer : layers) {
            output = layer.forward(output);
        }
        return output;
    }

    public TrainingResult train(double[][] X, double[][] Y) {
        List<Double> lossHistory = new ArrayList<>();
        Random rand = new Random();

        for (int epoch = 0; epoch < config.getEpochs(); epoch++) {
            if (config.isShuffle()) {
                DataHandler.shuffle(X, Y, rand);
            }

            double totalLoss = 0;
            int batchSize = config.getBatchSize();
            for (int i = 0; i < X.length; i += batchSize) {
                int end = Math.min(i + batchSize, X.length);
                double batchLoss = trainBatch(X, Y, i, end);
                totalLoss += batchLoss;
            }

            double avgLoss = totalLoss / (X.length / batchSize);
            lossHistory.add(avgLoss);
            System.out.println("Epoch " + epoch + ", Loss: " + avgLoss);
        }

        return new TrainingResult(lossHistory.get(lossHistory.size() - 1), lossHistory);
    }

    private double trainBatch(double[][] X, double[][] Y, int start, int end) {
        double totalLoss = 0;
        for (int i = start; i < end; i++) {
            double[] prediction = predict(X[i]);
            double loss = 0;
            for (int j = 0; j < prediction.length; j++) {
                loss += lossFunction.calculateLoss(Y[i][j], prediction[j]);
            }
            totalLoss += loss;

            // Backward pass
            double[] outputGradient = new double[prediction.length];
            for (int j = 0; j < prediction.length; j++) {
                outputGradient[j] = lossFunction.derivative(Y[i][j], prediction[j]);
            }

            for (int l = layers.size() - 1; l >= 0; l--) {
                outputGradient = layers.get(l).backward(outputGradient, config.getLearningRate());
            }
        }
        return totalLoss / (end - start);
    }
}

