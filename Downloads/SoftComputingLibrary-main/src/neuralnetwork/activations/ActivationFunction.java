//hidden layers kolha nfs el output lw msh 3ndna activation

//files will be used later in DenseLayer
// DenseLayer should store z
//During forward pass you already compute a.
//No need to recompute exp()
package neuralnetwork.activations;

public interface ActivationFunction {

    //forward
    double activate(double x);
    //backward
    double derivative(double activation);
}