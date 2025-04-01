import { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select, Image, Upload } from "antd";
import useCategory from "../../../../Hooks/useCategory";
import useSkinType from "../../../../Hooks/useSkinType";

const { Option } = Select;

function ModalProduct({
  isModalOpen,
  handleCancel,
  handleConfirmUpdate,
  editingProduct,
}) {
  const { categories, loading: loadingCategory } = useCategory();
  const { skinTypes, loading: loadingSkin } = useSkinType();

  const [form] = Form.useForm();
  console.log("product: ", editingProduct);

  //  const [selectedFile, setSelectedFile] = useState(null);
  //   const [previewImage, setPreviewImage] = useState(
  //     updateProduct?.image
  //   );

  useEffect(() => {
    if (editingProduct) {
      form.setFieldsValue(editingProduct);
    } else {
      form.resetFields();
    }
  }, [editingProduct, form]);

  if (loadingCategory || loadingSkin) {
    return <div>Loading...</div>;
  }

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      handleConfirmUpdate(values);
      handleCancel(); // Đóng modal sau khi cập nhật
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
          <Input />
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
          name="createdDate"
          label="Ngày tạo"
          rules={[{ required: true, message: "Vui lòng chọn ngày tạo!" }]}
        >
          <Input style={{ width: "100%" }} showTime />
        </Form.Item>

        <Form.Item
          name="expiredDate"
          label="Ngày hết hạn"
          rules={[{ required: true, message: "Vui lòng chọn ngày hết hạn!" }]}
        >
          <Input style={{ width: "100%" }} showTime />
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
            {editingProduct?.image && (
              <Image width={200} src={editingProduct.image} />
            )}

            <Upload
              listType="picture"
              showUploadList={false}
              beforeUpload={(file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                  form.setFieldsValue({ image: e.target.result });
                };
                reader.readAsDataURL(file);
                return false; // Ngăn tải lên ngay lập tức
              }}
            >
              <Input type="button" value="Chọn ảnh mới" />
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
