// consider that we have used tanh activation function
// hwa small improvement of initializing weights for tanh
// xavier limit =  sqt(1/in + out)
//w * limit
// symmetric around 0
// [-limit, +limit]
// Math.random() -> [0.0 , 1.0)
//Math.random() * 2 -> [0.0 , 2.0)
// (Math.random() * 2) - 1 -> [-1.0 , +1.0]
//(Math.random() * 2 - 1) * l -> [-limit , +limit]
package neuralnetwork.initialization;

public class Xavier implements WeightInitializer {

    @Override
    public void initialize(double [][] weights, int in, int out){

        double l = Math.sqrt(1.0 / (in + out));
         for (int i = 0 ; i < in; i++){
             for (int j = 0 ; j < out; j++){
                 weights[i][j] = (Math.random() * 2 - 1) * l;
             }
         }
    }
}

