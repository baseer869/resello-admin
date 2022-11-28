import React, { useState } from 'react'
import Api from "../services/index";
import { BASE_URL } from "../config/config";
import { bgStatusStyleHandler } from "../utils/ChangeOptionBg"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ChangeStatus(props) {

    const [loading, setLoading] = useState(false)
    const [option, setOption] = useState(props.option);

    // console.log(`updated status ===> ${updateStatus}`) 
    console.log(` props data from page ${props.orderTrans}`)//


    // for toast 
    const showToastMessage = () => {
        console.log(`this is toast`)
        toast.success("Status Updated SuccessFully...", {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const onChangeStatusHandler = async (e, id) => {
        e.preventDefault();
        setLoading(true)
        // setOption(e.target.value)
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

            setLoading(false)
            setOption(statuBody.transactionStatus);
            showToastMessage()
        }
        if (responce.status === 404) {
            setLoading(false)
        }

    }




    return (

        <>
            {
                loading ? <div className='loaderWrapper'><div className="dataloader" ></div></div> :
                    (<div
                        className={`${bgStatusStyleHandler(
                            option !== null ? option : props.orderTrans
                        )} select-option`}
                    >
                        <select disabled={props.orderTrans === "Completed" ? true : false}
                            value={
                                option !== null ? option : props.orderTrans
                            }
                            onChange={(e) =>
                                onChangeStatusHandler(e, props.orderid)
                            }
                            className={`${props.orderTrans === "Completed" ? "completed-color" : ""} select-trans-status`}
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