//works well with sigmoid binary
//works well with softmax categorical

package neuralnetwork.loss;

public class CrossEntropy implements LossFunction {
    
   @Override
    public double calculateLoss(double expected, double predicted) {
       return -(expected * Math.log(predicted) + (1 - expected) * Math.log(1- predicted));
   }

//    public double calculateLoss(double expected, double predicted) {
//        return expected * Math.log(predicted);
//    }
//

    public double derivative(double expected, double predicted) {
        return -(expected / predicted) + ((1 - expected) / (1 - predicted));
    }

    // valid only for sigmoid
//    public double derivative(double expected, double predicted) {
//        return predicted - expected;
//    }
}