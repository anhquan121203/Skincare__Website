import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useAccount from "../../../../Hooks/useAccount";

const ModalUpdateOrder = ({
    isModalOpen,
    handleCancel,
    handleUpdate,
    updateOrder,
}) => {
    const [form] = Form.useForm();
    // const { orders, loading, error } = useOrder();
    const { account } = useAccount();

    const staffOptions = account.filter((staff) => staff.roleName === "Staff");

    useEffect(() => {
        if (updateOrder) {
            form.setFieldsValue(updateOrder); // Correct
        }
    }, [updateOrder, isModalOpen]);

    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                handleUpdate(values);
                toast.success("Cập nhật thành công!");
            })
            .catch((info) => {
                console.error("Validation Failed:", info);
                toast.error("Cập nhật không thành công!");
            });
    };

    return (
        <Modal
            title="Cập nhật câu hỏi"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Cập nhật
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="id" hidden>
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="Người quản lí"
                    name="staffId"
                    rules={[{ required: true, message: "Vui lòng chọn loại da!" }]}
                >
                    <Select placeholder="Chọn loại da">
                        {staffOptions.map((staff) => (
                            <Select.Option key={staff.id} value={staff.id}>
                                {staff.email}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Trạng thái"
                    name="orderStatus"
                    rules={[{ required: true, message: "Vui lòng nhập câu hỏi!" }]}
                >
                    <Select>
                        <Select.Option value="Pedding">Pedding</Select.Option>
                        <Select.Option value="Confirmed">Confirmed</Select.Option>
                        <Select.Option value="Processing">Processing</Select.Option>
                        <Select.Option value="Completed">Completed</Select.Option>
                    </Select>
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default ModalUpdateOrder;
