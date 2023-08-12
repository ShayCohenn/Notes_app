import React from 'react'
import {Link} from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';

const AddButton = () => {
    return (
        <div>
            <Link to={"/note/new"} className='floating-button'>
                <AddIcon/>
            </Link>
        </div>
    )
}

export default AddButton