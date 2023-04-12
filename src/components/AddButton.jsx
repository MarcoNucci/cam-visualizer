import { useState } from 'react'

const AddButton = (props) => {
  return (
    <>
      <button className='AddButton' onClick={() => props.onClick(props.index)}>+</button>
    </>
    );
  };

export default AddButton;
