import NumberDisplay from "../../hooks/NumberDisplay"

export default function CounterCard({ title, count, icon }) {
    return (
        <div className='w-1/4 h-[161px] bg-white rounded-xl p-4'>
            <div className='flex justify-between '>
                <h1 className='text-base font-semibold text-right'>{title}</h1>
                <img src={icon} />
            </div>
            <p className={`${title === "اسم المستخدم" ? "text-[18px] pt-4"  : title === "رصيد اليوم" || title === "الرصيد الإتماني اليوم" ?   "text-[20px]" : "text-[32px]"} text-center font-medium pt-4`}>
                
                {title === "رصيد اليوم" || title === "الرصيد الإتماني اليوم" ? 
                    <div className="flex items-center gap-1" >
                    <p>L.S</p>
                    <p style={{ direction: 'ltr', unicodeBidi: 'plaintext' }} >{NumberDisplay(parseInt(count))}</p>
                    </div> 
                    : count}
                </p>
        </div>
    )
}