// works well with linear
package neuralnetwork.loss;

public class MSE implements LossFunction {
    
    @Override
    public double calculateLoss(double expected, double predicted) {
        return Math.pow(predicted - expected, 2);
    }

    @Override
    public double derivative(double expected, double predicted) {
        return 2 * (predicted - expected);
    }
}

