import ProtectedRoute from "../../../components/protectedRoute/ProtectedRoute";
import AccountDetails from '../AccountDetails'

const accountDetailRouter = [

    {
        path: "account_details",
        element: <ProtectedRoute   >

                <AccountDetails />
    
        </ProtectedRoute>

    }
]

export default accountDetailRouter