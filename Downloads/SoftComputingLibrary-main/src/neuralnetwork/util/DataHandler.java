package neuralnetwork.util;

import java.util.Arrays;
import java.util.Random;

public class DataHandler {

    // Normalize data to [0,1]
    public static double[][] normalize(double[][] data) {
        int rows = data.length;
        int cols = data[0].length;
        double[][] normalized = new double[rows][cols];
        for (int j = 0; j < cols; j++) {
            double min = Double.MAX_VALUE;
            double max = Double.MIN_VALUE;
            for (int i = 0; i < rows; i++) {
                min = Math.min(min, data[i][j]);
                max = Math.max(max, data[i][j]);
            }
            for (int i = 0; i < rows; i++) {
                normalized[i][j] = (data[i][j] - min) / (max - min);
            }
        }
        return normalized;
    }

    // Split data into train and test
    public static double[][][] trainTestSplit(double[][] X, double[][] Y, double trainRatio) {
        int n = X.length;
        int trainSize = (int) (n * trainRatio);
        int testSize = n - trainSize;

        double[][] XTrain = new double[trainSize][X[0].length];
        double[][] YTrain = new double[trainSize][Y[0].length];
        double[][] XTest = new double[testSize][X[0].length];
        double[][] YTest = new double[testSize][Y[0].length];

        // Simple split, no shuffle
        for (int i = 0; i < trainSize; i++) {
            XTrain[i] = Arrays.copyOf(X[i], X[i].length);
            YTrain[i] = Arrays.copyOf(Y[i], Y[i].length);
        }
        for (int i = 0; i < testSize; i++) {
            XTest[i] = Arrays.copyOf(X[trainSize + i], X[trainSize + i].length);
            YTest[i] = Arrays.copyOf(Y[trainSize + i], Y[trainSize + i].length);
        }

        return new double[][][]{XTrain, YTrain, XTest, YTest};
    }

    // Shuffle data
    public static void shuffle(double[][] X, double[][] Y, Random rand) {
        int n = X.length;
        for (int i = n - 1; i > 0; i--) {
            int j = rand.nextInt(i + 1);
            double[] tempX = X[i];
            X[i] = X[j];
            X[j] = tempX;
            double[] tempY = Y[i];
            Y[i] = Y[j];
            Y[j] = tempY;
        }
    }
}

