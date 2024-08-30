import React from 'react'

const Subgreiddits = () => {
  const id = window.location.pathname.split("/")[2];
  console.log(id);
  return (
    <div className='text-center text-danger'>
        <h3>HELLO THIS IS THE SUBGREIDDIT'S PAGE</h3>
      
    </div>
  )
}

export default Subgreiddits