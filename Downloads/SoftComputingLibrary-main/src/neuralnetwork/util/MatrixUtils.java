package neuralnetwork.util;

public class MatrixUtils {

    // Matrix multiplication: C = A * B
    public static double[][] multiply(double[][] A, double[][] B) {
        int rowsA = A.length;
        int colsA = A[0].length;
        int colsB = B[0].length;
        double[][] C = new double[rowsA][colsB];
        for (int i = 0; i < rowsA; i++) {
            for (int j = 0; j < colsB; j++) {
                for (int k = 0; k < colsA; k++) {
                    C[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        return C;
    }

    // Matrix-vector multiplication
    public static double[] multiply(double[][] A, double[] v) {
        int rows = A.length;
        int cols = A[0].length;
        double[] result = new double[rows];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                result[i] += A[i][j] * v[j];
            }
        }
        return result;
    }

    // Vector addition
    public static double[] add(double[] a, double[] b) {
        double[] result = new double[a.length];
        for (int i = 0; i < a.length; i++) {
            result[i] = a[i] + b[i];
        }
        return result;
    }

    // Matrix addition
    public static double[][] add(double[][] A, double[][] B) {
        int rows = A.length;
        int cols = A[0].length;
        double[][] C = new double[rows][cols];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                C[i][j] = A[i][j] + B[i][j];
            }
        }
        return C;
    }

    // Scalar multiplication
    public static double[][] scalarMultiply(double[][] A, double scalar) {
        int rows = A.length;
        int cols = A[0].length;
        double[][] C = new double[rows][cols];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                C[i][j] = A[i][j] * scalar;
            }
        }
        return C;
    }

    // Transpose
    public static double[][] transpose(double[][] A) {
        int rows = A.length;
        int cols = A[0].length;
        double[][] T = new double[cols][rows];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                T[j][i] = A[i][j];
            }
        }
        return T;
    }

    // Copy matrix
    public static double[][] copy(double[][] A) {
        int rows = A.length;
        int cols = A[0].length;
        double[][] C = new double[rows][cols];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                C[i][j] = A[i][j];
            }
        }
        return C;
    }

    // Print matrix (for debugging)
    public static void print(double[][] A) {
        for (double[] row : A) {
            for (double val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }
}