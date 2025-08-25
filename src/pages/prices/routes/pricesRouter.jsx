import ProtectedRoute from "../../../components/protectedRoute/ProtectedRoute";
import PricesList from "../PricesList";

const pricesRouter = [
    {
        path: "prices_list",
        element: <ProtectedRoute >
      
                <PricesList />
           
            
        </ProtectedRoute>
    }
]
export default pricesRouter