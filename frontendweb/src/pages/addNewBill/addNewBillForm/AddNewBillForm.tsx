import style from "./AddNewBillForm.module.css"
import Button from "../../../components/button/Button.tsx";
import {useForm} from "react-hook-form";
import ErrorMessage from "../../../components/errorMessage/ErrorMessage.tsx";
import Input from "../../../components/input/Input.tsx";
import {ChangeEvent, useState} from "react";

interface AddNewBillFormProps
{
    onSubmit: (data: AddNewBillFormObject) => void
    error?: string
}

export interface AddNewBillFormObject
{
    billImage: FileList,
    eventName: string
    place: string
    currency: string
}

export default function AddNewBillForm({onSubmit, error}: AddNewBillFormProps)
{
    const {register, handleSubmit, formState: {errors}} = useForm<AddNewBillFormObject>()
    const [preview, setPreview] = useState<string | null>(null)

    function handleImageChange(e: ChangeEvent<HTMLInputElement>)
    {
        const file = e.target.files?.[0]
        if (file)
            setPreview(URL.createObjectURL(file));
        else
            setPreview(null)
    }

    return (
        <form className={style.form} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            {preview && (
                <div className={style.imagePreview}>
                    <img alt={"preview of the bill"} src={preview}/>
                </div>
            )
            }
            <Input label={"Bill Image"}
                   type={"file"}
                   {...register("billImage", {
                       required: "Bill image is required",
                       onChange: handleImageChange
                   })}
                   error={errors.billImage?.message}
                   accept="image/*"/>
            <Input label={"Event Name"}
                   {...register("eventName", {
                       required: "Event Name is required",
                   })}
                   error={errors.eventName?.message}/>
            <Input label={"Place"}
                   {...register("place", {
                       required: "Place is required",
                   })}
                   error={errors.place?.message}/>
            <Input label={"Currency"}
                   {...register("currency", {
                       required: "Currency is required",
                   })}
                   error={errors.currency?.message}/>
            <ErrorMessage error={error}/>
            <Button value={"Next"} type={"submit"}/>
        </form>
    )
}
