
import { Suspense, lazy } from "react"


const Home = lazy(() => import('../Home'));

const homeRouter = [
    {
        path: "",
        element: 
              <Suspense fallback={<div>جارٍ تحميل صفحة تسجيل الدخول...</div>}>
                 <Home />
              </Suspense>
           

    }
]

export default homeRouter