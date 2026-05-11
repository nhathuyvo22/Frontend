"use client";
import Table from "@/components/common/Table.js";
export default function AdminTable({
    columns,
    data,
    onEdit,
    onDelete,
    editLabel = "Sửa",
    deleteLabel = "Xóa",
    page = 1,
    limit = 10
}) {

    const extendedColumns = [
        { key: "stt", label: "STT" },
        ...columns,
        { key: "actions", label: "Actions" }
    ];

    const tableData = data.map((item, index) => ({
        stt: (page - 1) * limit + (index + 1),
        ...item,
        actions: (
            <div className="flex gap-2">
                <button onClick={() => onEdit && onEdit(item)}
                    className="rounded-md bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-400"
                >
                    {editLabel}
                </button>
                <button onClick={() => onDelete && onDelete(item)}
                    className="rounded-md bg-rose-500 px-3 py-1 text-white transition hover:bg-rose-400"
                >
                    {deleteLabel}
                </button>
            </div>
        ),
    }));

    return <Table columns={extendedColumns} data={tableData} />;
}