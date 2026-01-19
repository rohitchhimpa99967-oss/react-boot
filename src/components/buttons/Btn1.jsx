import React from 'react'

const Btn1 = ({btntxt,onclick,width='w-[90px]'}) => {
  return (
    <div>
      <button onClick={onclick} className={`bg-green-500 text-white p-2 rounded-md ${width}`}>{btntxt}</button>
    </div>
  )
}

export default Btn1
