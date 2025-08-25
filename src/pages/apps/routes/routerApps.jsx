import ProtectedRoute from "../../../components/protectedRoute/ProtectedRoute";
import Apps from "../Apps";


const appsRouter = [
  {
    path: "application",

    element: <ProtectedRoute  >
    
        <Apps />
      
    </ProtectedRoute>,
  },
];
export default appsRouter