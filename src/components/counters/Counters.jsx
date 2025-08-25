import CounterCard from '../counterCardHome/CounterCard'

export default function Counters({dataCounter}) {
    return (
        <div className="w-full flex items-center justify-end gap-4 flex-row-reverse mt-6">
            {dataCounter.user_balance !==undefined &&
                <CounterCard icon={"/assets/icons/iconBalance.svg"}
                    count={dataCounter.user_balance}
                    title={"رصيد اليوم"}
                />
            }

            {dataCounter.user_credit !==undefined &&
                <CounterCard
                    icon={"/assets/icons/iconBalance.svg"}
                    count={dataCounter.user_credit}
                    title={"الرصيد الإتماني اليوم"}
                />
            }

            {dataCounter.employee_count !==undefined &&
                <CounterCard
                    icon={"/assets/icons/iconEmployee.svg"}
                    count={dataCounter.employee_count}
                    title={"عدد الموظفين"}
                />
            }

            {dataCounter.opertions_count !==undefined &&
                <CounterCard
                    icon={"/assets/icons/iconProggress.svg"}
                    count={dataCounter.opertions_count}
                    title={"عدد العمليات اليوم"}
                />
            }

            {dataCounter.point_of_sale_count !==undefined &&
                <CounterCard
                    icon={"/assets/icons/iconPoints.svg"}
                    count={dataCounter.point_of_sale_count}
                    title={"عدد نقاط البيع"}
                />
            }

        </div>
    )
}
