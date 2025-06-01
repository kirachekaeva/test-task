import { StoreContext } from "@/app/provider/StoreProvider";
import { FC, useContext, useEffect } from "react";
import { Table } from "antd";
import { observer } from "mobx-react-lite";
import { useInfiniteLoader } from "../../hooks/useInfiniteScroll";

export const ShowTable: FC = observer(() => {
    const { tableStore } = useContext(StoreContext);
    const { isFetching } = useInfiniteLoader({
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
        <Table
            columns={columns}
            dataSource={tableStore.items}
            rowKey="id"
            loading={tableStore.loading || isFetching}
            pagination={false}
        />
    )
})