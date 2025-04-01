import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Image,
  Upload,
  Button,
} from "antd";
import useCategory from "../../../../Hooks/useCategory";
import useSkinType from "../../../../Hooks/useSkinType";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

function ModalProduct({
  isModalOpen,
  handleCancel,
  handleConfirmUpdate,
  editingProduct,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    editingProduct?.image || null
  );

  const { categories, loading: loadingCategory } = useCategory();
  const { skinTypes, loading: loadingSkin } = useSkinType();

  const [form] = Form.useForm();

  useEffect(() => {
    if (editingProduct) {
      form.setFieldsValue(editingProduct);
      setPreviewImage(editingProduct.image);
    } else {
      form.resetFields();
      setPreviewImage(null);
    }
  }, [editingProduct, form]);

  if (loadingCategory || loadingSkin) {
    return <div>Loading...</div>;
  }

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const formData = new FormData();
      formData.append("Id", values.id);
      formData.append("ProductName", values.productName);
      formData.append("Description", values.description || "");
      formData.append("Price", values.price);
      formData.append("Quantity", values.quantity);
      formData.append("productStatus", values.productStatus);
      formData.append("categoryId", values.categoryId);
      formData.append("skinTypeId", values.skinTypeId);

      // Kiểm tra nếu có file mới thì gửi file, nếu không thì giữ nguyên
      if (selectedFile) {
        formData.append("AttachmentFile", selectedFile);
      } else {
        formData.append("AttachmentFile", previewImage); // Giữ nguyên ảnh cũ
      }

      handleConfirmUpdate(formData); // Gửi formData
      handleCancel(); // Đóng modal
    });
  };

  return (
    <Modal
      title="Cập nhật sản phẩm"
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleSubmit}
      okText="Cập nhật"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item name="id" label="Mã sản phẩm">
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="productName"
          label="Tên sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="price"
          label="Giá"
          rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Số lượng"
          rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item name="image" label="Hình ảnh">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {previewImage && <Image width={200} src={previewImage} />}

            <Upload
              listType="picture"
              showUploadList={false}
              accept="image/*"
              beforeUpload={(file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                  setPreviewImage(e.target.result);
                };
                reader.readAsDataURL(file);
                setSelectedFile(file);
                return false; // Ngăn tải lên ngay lập tức
              }}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh mới</Button>
            </Upload>
          </div>
        </Form.Item>

        <Form.Item name="productStatus" label="Trạng thái">
          <Select>
            <Option value="Available">Có sẵn</Option>
            <Option value="Unavailable">Hết hàng</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="categoryId"
          label="Danh mục"
          rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
        >
          <Select>
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.categoryName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="skinTypeId"
          label="Loại da"
          rules={[{ required: true, message: "Vui lòng chọn loại da!" }]}
        >
          <Select>
            {skinTypes.map((skinType) => (
              <Option key={skinType.id} value={skinType.id}>
                {skinType.skinTypeName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalProduct;
