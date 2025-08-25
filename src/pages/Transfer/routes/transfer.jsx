import ProtectedRoute from "../../../components/protectedRoute/ProtectedRoute";
import Transfer from '../Transfer'

const transfer = [
  {
    path: "transfer",
    element: <ProtectedRoute   >
      
        <Transfer />



    </ProtectedRoute>,
  },
];
export default transfer