import * as React from 'react'
import PreLoader from '../../../../assets/gifs/preloading.gif';
function Loader(){
    return (
        <div className="loading-container">
            <img src={PreLoader}
                    width={200}
                    height={200}/>
        </div>
    )
}

export default Loader;