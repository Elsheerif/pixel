//f(x) = max(0,x)
//output[0-]
//>0 linear
//<0 non-linear
package neuralnetwork.activations;

public class ReLU implements ActivationFunction {

    @Override
    public double activate(double x){
        return  Math.max(0,x);
    }

    @Override
    public double derivative(double activation) {
        if(activation > 0) return 1.0;

        return 0;
    }
}