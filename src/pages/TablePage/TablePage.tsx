import { FC, useContext, useState } from "react";
import styles from './TablePage.module.css';
import { StoreContext } from "@/app/provider/StoreProvider";
import { TableForm } from "@/modules/Table/components/TableForm/TableForm";
import { ShowTable } from "@/modules/Table/components/Table/Table";
import { CreateNewTable } from "@/modules/Table/components/CreateNewTable/CreateNewTable";
import { observer } from "mobx-react-lite";
import { Button, Modal } from "antd";

export const TablePage: FC = observer(() => {
    const { tableStore } = useContext(StoreContext);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleDelete = async () => {
        await tableStore.deleteTable();
    }
    return (
        <section className={styles["table__container"]}>
            {tableStore.fields.length > 0 ? (
                <div className={styles["table__content"]}>
                    <div className={styles["table__header"]}>
                        <Button
                            type="primary"
                            onClick={() => setIsFormVisible(true)}
                        >
                            Добавить запись
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleDelete}>
                            Удалить таблицу
                        </Button>
                    </div>

                    <ShowTable />

                    <Modal
                        title="Добавить новую запись"
                        open={isFormVisible}
                        onCancel={() => setIsFormVisible(false)}
                        footer={null}
                    >
                        <TableForm onSuccess={() => setIsFormVisible(false)} />
                    </Modal>
                </div>
            ) : (
                <CreateNewTable />
            )}
        </section>
    );
});