import { StoreContext } from "@/app/provider/StoreProvider";
import { FC, useContext, useEffect } from "react";
import { Table, Spin, Alert } from "antd";
import { observer } from "mobx-react-lite";
import { useInfiniteLoader } from "../../hooks/useInfiniteScroll";
import styles from './Table.module.css';

export const ShowTable: FC = observer(() => {
    const { tableStore } = useContext(StoreContext);
    const { isFetching, hasMore } = useInfiniteLoader({
        initialPage: 1,
        pageSize: 20,
    });

    useEffect(() => {
        const fetch = async () => {
            await tableStore.fetchTableData(1, 20);
        }
        fetch();
    }, [])

    if (!tableStore.fields || tableStore.fields.length === 0) {
        return <p>Создайте свою таблицу</p>;
    }

    const columns = [
        ...tableStore.fields.map(field => ({
            title: field,
            dataIndex: field,
            key: field,
        }))
    ];

    return (
        <div className={styles["table__container"]}>
            <Table
                columns={columns}
                dataSource={tableStore.items}
                rowKey="id"
                loading={tableStore.loading}
                pagination={false}
            />

            {isFetching && (
                <div className={styles["loader__container"]}>
                    <Spin tip="Загрузка..." size="large" />
                </div>
            )}

            {!hasMore && !isFetching && tableStore.items.length > 0 && (
                <Alert
                    message="Все данные загружены"
                    type="info"
                    showIcon
                    className={styles["end__message"]}
                />
            )}
        </div>
    )
})
