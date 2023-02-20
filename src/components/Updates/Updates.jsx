import React from 'react'
import "./Updates.css";
import { UpdatesData } from "../../data/Data"

const Updates = () => {
    return (
        <div className='updates'>
            {
                UpdatesData && UpdatesData.map(val => {
                    return (
                        <div className='update'>
                            <img src={val.img} alt="" />
                            <div className='noti'>
                                <div style={{ marginBottom: "1.54rem" }}>
                                    {val.wallet}
                                    {val.notif} 
                                    <br />
                                    <br />
                                    <div>{val.data}</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Updates