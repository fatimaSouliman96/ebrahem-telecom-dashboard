
import {  NavLink } from "react-router-dom";


export default function Results({ searchResults, openResults, setOpenResults}) {

      
        const handelCloseResults = () => {
          setOpenResults(false)
      
        }

    return (
        openResults == true ?
            <div className={`w-full  h-screen bg-[#00000080] absolute top-20 left-0 z-10`} >
                <div className="w-[35%] p-4 bg-white rounded-xl top-8 ml-2 mr-14 absolute">
                    <ul className=" p-4 text-right">

                        {
                            searchResults.length !== 0 ? searchResults.map((ele, index) => [
                                <li key={index} className="pt-2"><NavLink className="hover:text-sky-600" onClick={
                                    function () {
                                        handelCloseResults()
                                        setValueResult("")

                                    }} to={ele.path} >{ele.text}</NavLink>
                                    <hr className=" mt-2 text-[#E0E0E0]" />
                                </li>
                            ])
                                : <li>لا توجد نتائج للبحث</li>
                        }
                    </ul>

                </div>
            </div> : null
    )
}
