package neuralnetwork.loss;

public interface LossFunction {

    double calculateLoss(double expected, double predicted);

    // backpropagate
    double derivative(double expected, double predicted);
}