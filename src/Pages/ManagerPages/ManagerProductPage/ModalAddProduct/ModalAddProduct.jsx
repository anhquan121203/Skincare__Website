import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useCategory from "../../../../Hooks/useCategory";
import useSkinType from "../../../../Hooks/useSkinType";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import useAccount from "../../../../Hooks/useAccount";

const ModalAddProduct = ({
  isModalOpen,
  handleCancel,
  handleAdd,
  productNameExist,
}) => {
  const [form] = Form.useForm();
  const { categories } = useCategory();
  const { skinTypes, loading } = useSkinType();
  const [selectedFile, setSelectedFile] = useState(null);

  const { account } = useAccount();
  console.log("account", account);

  const staffOptions = account.filter((staff) => staff.roleName === "Staff");

  useEffect(() => {
    if (isModalOpen) {
      form.resetFields(); // Always reset form when modal opens
      setSelectedFile(null);
    }
  }, [isModalOpen]);

  const handleUploadImage = ({ file }) => {
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      // Thêm dữ liệu sản phẩm vào formData
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      // Nếu có ảnh, thêm vào formData
      if (selectedFile) {
        formData.append("AttachmentFile", selectedFile);
      }

      const checkProductName = await productNameExist(values.productName);
      if (checkProductName) {
        toast.error("Sản phẩm đã tồn tại. Vui lòng nhập sản phẩm khác!");
        return;
      }

      // Gửi dữ liệu về `ManagerProduct`
      await handleAdd(formData);
      form.resetFields();
      handleCancel(); // Đóng modal
      toast.success("Tạo sản phẩm thành công");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      toast.error("Tạo sản phẩm không thành công!!!");
    }
  };

  return (
    <Modal
      title="Tạo sản phẩm mới"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Tạo sản phẩm
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên sản phẩm"
          name="productName"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Giá tiền"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Ngày sản xuất"
          name="createdDate"
          rules={[{ required: true, message: "Vui lòng nhập ngày sản xuất!" }]}
        >
          <DatePicker placeholder="Ngày sản xuất" />
        </Form.Item>

        <Form.Item
          label="Ngày hết hạn"
          name="expiredDate"
          rules={[{ required: true, message: "Vui lòng nhập ngày hết hạn!" }]}
        >
          <DatePicker placeholder="Ngày hết hạn" />
        </Form.Item>

        <Form.Item
          label="Loại sản phẩm"
          name="CategoryId"
          rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm!" }]}
        >
          <Select loading={loading} placeholder="Chọn loại sản phẩm">
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.categoryName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Loại da"
          name="SkinTypeId"
          rules={[{ required: true, message: "Vui lòng chọn loại da!" }]}
        >
          <Select loading={loading} placeholder="Chọn loại da">
            {skinTypes.map((skinType) => (
              <Select.Option key={skinType.id} value={skinType.id}>
                {skinType.skinTypeName}
              </Select.Option>
            ))}
          </Select>
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
          label="Ảnh sản phẩm"
          name="AttachmentFile"
          rules={[
            { required: true, message: "Vui lòng tải lên ảnh sản phẩm!" },
          ]}
        >
          <Upload
            beforeUpload={() => false}
            showUploadList={true}
            accept="image/*"
            onChange={handleUploadImage}
          >
            <Button icon={<FaPlus />}> Chọn ảnh </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddProduct;
