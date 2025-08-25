import ProtectedRoute from "../../../components/protectedRoute/ProtectedRoute";
import AccountsManage from '../AccountsManage'


const accountsManage = [
  {
    path: "accounts",

    element: <ProtectedRoute  >
    
        <AccountsManage />
      
    </ProtectedRoute>
    ,
  },
];
export default accountsManage