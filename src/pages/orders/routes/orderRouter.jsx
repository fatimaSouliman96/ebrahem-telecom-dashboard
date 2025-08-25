
import ProtectedRoute from "../../../components/protectedRoute/ProtectedRoute";
import Orders from '../Orders'

const ordersRouter = [

    {
        path: "orders",
        element: <ProtectedRoute  >
          
                <Orders />
        
        </ProtectedRoute>
    }

]

export default ordersRouter