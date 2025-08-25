import ProtectedRoute from "../../../components/protectedRoute/ProtectedRoute";
import AccountStatement from '../AccountStatement'

const accountRouter = [
    {

        path: "account-statement",
        element: <ProtectedRoute  >
        
                <AccountStatement />
            
        </ProtectedRoute>
    }
]
export default accountRouter