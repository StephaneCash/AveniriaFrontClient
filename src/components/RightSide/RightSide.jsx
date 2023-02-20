import React from 'react';
import CustomReview from '../CustomReview/CustomReview';
import Updates from '../Updates/Updates';
import "./RightSide.css";

const RightSide = () => {
    return (
        <div className='rightside'>
            <div>
                <h3>Transactions par Cards</h3>
                <Updates />
            </div>

            <div>
                <h3>Review</h3>
                <CustomReview />
            </div>
        </div>
    )
}

export default RightSide