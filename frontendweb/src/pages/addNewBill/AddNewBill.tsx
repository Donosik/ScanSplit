import style from "./AddNewBill.module.css"
import AddNewBillForm, {AddNewBillFormObject} from "./addNewBillForm/AddNewBillForm.tsx";
import {useMutation} from "@tanstack/react-query";

export default function AddNewBill()
{
    const {mutate,reset,error}=useMutation({
        mutationFn:(data:AddNewBillFormObject)=>{
            return new Promise((resolve,reject)=>{return reject})
        }
    })

    function onSubmit(data:AddNewBillFormObject){
        reset()
        mutate(data)
    }
    return (
        <div className={style.container}>
            <div className={style.header}>
                Add bill to event
            </div>
            <div className={style.main}>
                <div>Add a Bill</div>
                <AddNewBillForm onSubmit={onSubmit} error={error?.message}/>
            </div>
        </div>
    );
}
