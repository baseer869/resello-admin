import React, { useState } from 'react'
import Api from "../services/index";
import { BASE_URL } from "../config/config";
import { bgStatusStyleHandler } from "../utils/ChangeOptionBg"
function ChangeStatus(props) {

    const [loading, setLoading] = useState(false)
    const [updateStatus, setUpdateStatus] = useState(null)

    console.log(updateStatus) //
    console.log(props.orderTrans)//



    async function onChangeStatusHandler(e, id) {
        e.preventDefault();
        setLoading(true)
        props.setOption(e.target.value)
        console.log(e.target.value)
        let statuBody = {
            transactionStatus: e.target.value,
            id: id,
            type: "credit",
            processed_by: null,
        };
        console.log("called", statuBody);
        let responce = await Api(
            `${BASE_URL}/changeOrderStatus`,
            statuBody,
            "POST",
            null
        );
        console.log("RESPONSREEEEEEEEE", responce);
        if (responce.status === 200) {
            bgStatusStyleHandler(statuBody.transactionStatus)
            setUpdateStatus(statuBody.transactionStatus)
            setLoading(false)
        }
    }

    return (

        <>
            {
                loading ? "load" :
                    (<div
                        className={`${bgStatusStyleHandler(
                            updateStatus !== null ? updateStatus : props.orderTrans
                        )} select-option`}
                    >
                        <select
                            value={
                                props.option ? null : props.orderTrans
                            }
                            onChange={(e) =>
                                onChangeStatusHandler(e, props.orderid)
                            }
                            className={`select-trans-status`}
                        >
                            <option>Pending</option>
                            <option>Cancelled</option>
                            <option>Completed</option>
                            <option>Shipped</option>
                            <option>Partially_Completed</option>
                        </select>
                    </div>)

            }
        </>

    )
}

export default ChangeStatus