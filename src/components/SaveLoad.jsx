import React from 'react';

const SaveLoad = ({saveState, loadState}) => {
    
    return (
        
        <div className='centered'>
            <button onClick={saveState} className="ComputeButton">
                Save
            </button>
            <input className="ComputeButton"
                type="file"
                accept="application/json"
                onChange={loadState}
            />
        </div>
    );
};

export default SaveLoad;
