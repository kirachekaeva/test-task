import { StoreContext } from "@/app/provider/StoreProvider";
import { Button, Form, Input } from "antd";
import { FC, useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from './CreateNewTable.module.css';

export const CreateNewTable: FC = observer(() => {
    const { tableStore } = useContext(StoreContext);
    const [numFields, setNumFields] = useState<number>(0);
    const [fieldNames, setFieldNames] = useState<string[]>([]);

    const handleFieldChange = (index: number, value: string) => {
        const newFieldNames = [...fieldNames];
        newFieldNames[index] = value;
        setFieldNames(newFieldNames);
    };

    const handleSubmit = async () => {
        console.log(fieldNames);
        tableStore.setFields(fieldNames);
    };

    

    return (
        <div className={styles["create-table-form__container"]}>
            <h2>Создать таблицу</h2>
            <Form layout="vertical">
                <Form.Item
                    label="Количество полей"
                    rules={[{ required: true }]}>
                    <Input
                        type="number"
                        min={5}
                        max={15}
                        value={numFields}
                        onChange={(e) => setNumFields(Number(e.target.value))}
                    />
                </Form.Item>
                {numFields <= 15 && numFields >= 5 ? Array.from({ length: numFields }, (_, index) => (
                    <Form.Item key={index} label={`Название поля ${index + 1}`}>
                        <Input
                            value={fieldNames[index] || ""}
                            onChange={(e) => handleFieldChange(index, e.target.value)}
                        />
                    </Form.Item>
                )): <Form.Item>Введите количество полей от 5 до 15</Form.Item>}
                <Form.Item>
                    <Button type="primary" onClick={handleSubmit} disabled={numFields === 0}>
                        Создать таблицу
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
});