import ProtectedRoute from "../../../components/protectedRoute/ProtectedRoute";
import AddBalance from '../AddBalance'

const addBalance = [
  {
    path: "balance",

    element: <ProtectedRoute   >
    
        <AddBalance />
      
    </ProtectedRoute>,
  },
];
export default addBalance