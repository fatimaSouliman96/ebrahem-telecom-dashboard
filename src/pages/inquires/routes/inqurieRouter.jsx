import ProtectedRoute from "../../../components/protectedRoute/ProtectedRoute";
import Inquries from "../Inquries";


const inquresRouter = [

    {
        path: "inquries",
        element: <ProtectedRoute  >
          
                <Inquries />
        
        </ProtectedRoute>
    }

]

export default inquresRouter