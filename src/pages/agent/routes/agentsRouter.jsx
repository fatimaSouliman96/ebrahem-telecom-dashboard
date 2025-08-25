
import ProtectedRoute from "../../../components/protectedRoute/ProtectedRoute";
import Agents from "../Agents";

const agentsRouter = [
  {
    path: "agents",

    element: <ProtectedRoute  >
    
        <Agents />
      
    </ProtectedRoute>,
  },
];
export default agentsRouter