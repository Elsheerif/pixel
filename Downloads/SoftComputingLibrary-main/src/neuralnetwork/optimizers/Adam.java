package neuralnetwork.optimizers;

public class Adam implements Optimizer {

    private double beta1 = 0.9;
    private double beta2 = 0.999;
    private double epsilon = 1e-8;
    private double[][] mWeights;
    private double[][] vWeights;
    private double[] mBiases;
    private double[] vBiases;
    private int t = 0;

    @Override
    public void update(double[][] weights, double[][] gradients, double learningRate) {
        if (mWeights == null) {
            mWeights = new double[weights.length][weights[0].length];
            vWeights = new double[weights.length][weights[0].length];
        }
        t++;
        // Update m and v
        for (int i = 0; i < weights.length; i++) {
            for (int j = 0; j < weights[0].length; j++) {
                mWeights[i][j] = beta1 * mWeights[i][j] + (1 - beta1) * gradients[i][j];
                vWeights[i][j] = beta2 * vWeights[i][j] + (1 - beta2) * gradients[i][j] * gradients[i][j];
                double mHat = mWeights[i][j] / (1 - Math.pow(beta1, t));
                double vHat = vWeights[i][j] / (1 - Math.pow(beta2, t));
                weights[i][j] -= learningRate * mHat / (Math.sqrt(vHat) + epsilon);
            }
        }
    }

    @Override
    public void update(double[] biases, double[] gradients, double learningRate) {
        if (mBiases == null) {
            mBiases = new double[biases.length]; 
            vBiases = new double[biases.length];
        }
        for (int i = 0; i < biases.length; i++) {
            mBiases[i] = beta1 * mBiases[i] + (1 - beta1) * gradients[i];
            vBiases[i] = beta2 * vBiases[i] + (1 - beta2) * gradients[i] * gradients[i];
            double mHat = mBiases[i] / (1 - Math.pow(beta1, t));
            double vHat = vBiases[i] / (1 - Math.pow(beta2, t));
            biases[i] -= learningRate * mHat / (Math.sqrt(vHat) + epsilon);
        }
    }
}