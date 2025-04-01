import { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Image,
  Upload,
  Space,
} from "antd";
import dayjs from "dayjs";

const { Option } = Select;

function ModalProduct({
  isModalOpen,
  handleCancel,
  handleConfirmUpdate,
  editingProduct,
}) {
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

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      handleConfirmUpdate(values);
      handleCancel(); // Đóng modal sau khi cập nhật
    });
  };

  //  useEffect(() => {
  //     if (updateProduct) {
  //       setPreviewImage(updateProduct.image);
  //       form.setFieldsValue({
  //         ...updateProduct,
  //         CategoryId: updateProduct.CategoryId || null,
  //         SkinTypeId: updateProduct.SkinTypeId || null,
  //         // Format dates to moment if needed
  //         createdDate: updateProduct.createdDate
  //           ? moment(updateProduct.createdDate)
  //           : null,
  //         expiredDate: updateProduct.expiredDate
  //           ? moment(updateProduct.expiredDate)
  //           : null,
  //       });
  //       setSelectedFile(null);
  //     }
  //   }, [updateProduct, isModalOpen]);

  //   const handleUploadImage = ({ file }) => {
  //     setSelectedFile(file);
  //     setPreviewImage(URL.createObjectURL(file));
  //   };

  
  // const handleSubmit = async () => {
  //     try {
  //       const values = await form.validateFields();
  //       const formData = new FormData();
  //       console.log(values);

  //       if (!values.id) {
  //         toast.error("Lỗi: Không tìm thấy ID sản phẩm!");
  //         return;
  //       }
  //       const { createdDate, expiredDate, ...restValues } = values;
  //       if (createdDate) {
  //         formData.append("createdDate", moment(createdDate).format("YYYY-MM-DDTHH:mm:ss"));
  //       }
  //       if (expiredDate) {
  //         formData.append("expiredDate", moment(expiredDate).format("YYYY-MM-DDTHH:mm:ss"));
  //       }

  //       formData.append("id", values.id);
  //       // Thêm dữ liệu sản phẩm vào formData
  //       Object.keys(restValues).forEach((key) => {
  //         formData.append(key, restValues[key]);
  //       });

  //       // Nếu có ảnh, thêm vào formData
  //       if (selectedFile) {
  //         formData.append("AttachmentFile", selectedFile);
  //       }

  //       handleUpdate(formData);
  //       form.resetFields();
  //       handleCancel();
  //       toast.success("Cập nhật sản phẩm thành công!");
  //     } catch (error) {
  //       console.error("Lỗi khi thêm sản phẩm:", error);
  //       toast.error("Lỗi sản phẩm!");
  //     }
  //   };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
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
          <InputNumber style={{ width: "100%" }} min={1} />
        </Form.Item>

        <Form.Item
          name="skinTypeId"
          label="Loại da"
          rules={[{ required: true, message: "Vui lòng chọn loại da!" }]}
        >
          <InputNumber style={{ width: "100%" }} min={1} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalProduct;
