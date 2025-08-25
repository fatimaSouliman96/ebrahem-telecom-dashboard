import { CircularProgress } from "@mui/material"
;
import { Suspense } from "react";



export default function SuspenseLoading({children}) {
    
    return (
        <div className="loading" >
            <Suspense fallback={<CircularProgress />}>
                {children}
            </Suspense>
        </div>
    )
}