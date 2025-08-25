import ProtectedRoute from "../../../components/protectedRoute/ProtectedRoute";
import Providers from "../Providers";


const providersRouter = [
  {
    path: "providers",

    element: <ProtectedRoute  >
    
        <Providers />
      
    </ProtectedRoute>
    ,
  },
];
export default providersRouter