import { StoreContext } from "@/app/provider/StoreProvider";
import { Button, Form, Input } from "antd";
import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";

interface TableFormProps {
    onSuccess?: () => void;
}

export const TableForm: FC<TableFormProps> = observer(({ onSuccess }) => {
    const { tableStore } = useContext(StoreContext);
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        const itemData = {
            ...values,
            createdAt: values.createdAt ? values.createdAt.format('YYYY-MM-DD') : new Date().toISOString()
        };
        await tableStore.createItem(itemData);
        form.resetFields();
        onSuccess?.();
    };

    if (!tableStore.fields || tableStore.fields.length === 0) {
        return null;
    }
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
        >
            {tableStore.fields.map((field, index) => (
                <Form.Item
                    key={`${field} + ${index}`}
                    name={field}
                    label={field}
                    rules={[{ required: true, message: `Заполните ${field}!` }]}
                >
                    <Input placeholder={`Введите ${field}`} />
                </Form.Item>
            ))}

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={tableStore.loading}
                >
                    Добавить запись
                </Button>
            </Form.Item>
        </Form>
    )
});