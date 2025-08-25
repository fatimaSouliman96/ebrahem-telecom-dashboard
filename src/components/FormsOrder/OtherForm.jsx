import React from 'react'
import MainButton from '../elements/MainButton'

export default function OtherForm() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex w-full justify-between gap-4">
        <div className="flex flex-col gap-3 w-full">
          <label htmlFor="point" className="text-xs font-medium">
         الخدمة
          </label>
          <select
            type="text"
            name="order"
            id="point"
            className="selection appearance-none  rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          >
            <option>اختر الخدمة</option>
          </select>
        </div>

      </div>
      <div className="flex w-full justify-between gap-4">
        <div className="flex flex-col gap-3 w-full">
          <label htmlFor="way" className="text-xs font-medium">
                المبلغ
          </label>
          <input
            type="text"
            name="amount"
            id="way"
            placeholder='باقي 5.500.000'
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          />
        </div>
       
      </div>
      <div className="flex flex-col gap-3 w-full">
        <label htmlFor="notes" className="text-xs font-medium">
          ملاحظات
        </label>
        <input
          type="text"
          name="notes"
          id="notes"
          className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
        />
      </div>
      <MainButton title="أرسل الآن" h="44px" w="274px" />
    </form>
  )
}
