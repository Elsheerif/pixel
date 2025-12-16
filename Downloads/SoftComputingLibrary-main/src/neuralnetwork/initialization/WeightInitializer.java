// inside dense layer we will use initial weights
package neuralnetwork.initialization;

public interface WeightInitializer {

    void initialize(double [][] weights, int in, int out);
}