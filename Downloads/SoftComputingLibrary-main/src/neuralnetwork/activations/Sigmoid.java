// f(x) = 1/1+e^-x
//output[0-1]
//center 0.5
// <0.5
//>0.5
package neuralnetwork.activations;

public class Sigmoid implements ActivationFunction {

    @Override
    public double activate(double x) {
        return 1.0 / (1.0 + Math.exp(-x));
    }

    @Override
    public double derivative(double activation) {
        return activation * (1.0 - activation);
    }
}