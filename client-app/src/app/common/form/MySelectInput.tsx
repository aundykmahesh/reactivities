import { useField } from "formik";
import React from "react";
import { Label , Select} from "semantic-ui-react";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";


export interface Props{
    placeholder : string;
    name: string;
    label?: string;
    options:any;
}

export default function MyTextArea(props:Props) {
    const [field,meta, helpers] = useField(props.name);

    return(
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select clearable 
                options={props.options} 
                value={field.value || null}
                onChange={(e,d) => helpers.setValue(d.value)}
                onBlur={() => helpers.setTouched(true)}
                placeholder = {props.placeholder}
                />

            {meta.touched && meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ):null}
        </Form.Field>
    )
}