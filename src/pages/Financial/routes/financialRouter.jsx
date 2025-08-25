import { Suspense,lazy } from "react";
import ProtectedRoute from "../../../components/protectedRoute/ProtectedRoute";


const Financial = lazy(() => import('../Financial'));

const financialRouter = [
    {
        path: "financial",

        element: <Suspense fallback={<div>جارٍ تحميل صفحة تسجيل الدخول...</div>}>
            <ProtectedRoute >

                <Financial />

            </ProtectedRoute>
        </Suspense>
    }
]
export default financialRouter