// consider that we have used ReLU activation function
// scaling factor is 2^0.5
// He limit =  sqt(2/in)
//w * limit
// depends only on in and not in + out
package neuralnetwork.initialization;

public class He implements WeightInitializer {

    @Override
    public void initialize(double [][] weights, int in, int out){
        double l = Math.sqrt(2.0 / in);
        for (int i = 0 ; i < in; i++){
            for (int j = 0 ; j < out; j++){
                weights[i][j] = (Math.random() * 2 - 1) * l;
            }
        }
    }
}

