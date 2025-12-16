// random uniform distribution in range [0,1] or even better [-0.5,0.5]
// Math.random() gives a value in [0.0, 1.0]
package neuralnetwork.initialization;

public class RandomUniform implements WeightInitializer {
    
   @Override
   public void initialize(double [][] weights, int in, int out){

       for (int i = 0 ; i < in; i++){
           for (int j = 0 ; j < out; j++){
               weights[i][j] = Math.random() - 0.5;
           }
       }
   }
}

