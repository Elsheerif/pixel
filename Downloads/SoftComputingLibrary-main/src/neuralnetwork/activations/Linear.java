// no activation function in output neuron
package neuralnetwork.activations;

public class Linear implements ActivationFunction {

    @Override
    public double activate(double x){
        return  x;
    }

    @Override
    public double derivative(double activation) {return 1.0;}
}