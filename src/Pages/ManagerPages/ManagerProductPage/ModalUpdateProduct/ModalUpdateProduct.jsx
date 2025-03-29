import {
  Button,
  Form,
  Image,
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
import { FaPlus } from "react-icons/fa";

const ModalUpdateProduct = ({
  isModalOpen,
  handleCancel,
  handleUpdate,
  updateProduct,
}) => {
  const [form] = Form.useForm();
  const { categories } = useCategory();
  const { skinTypes, loading } = useSkinType();
   const [selectedFile, setSelectedFile] = useState(null); 

  useEffect(() => {
    if (updateProduct) {
      form.setFieldsValue({
        ...updateProduct,
        CategoryId: updateProduct.CategoryId || null,
        SkinTypeId: updateProduct.SkinTypeId || null,
      });
      setSelectedFile(null);
    }
  }, [updateProduct, isModalOpen]);

  const handleUploadImage = ({ file }) => {
    setSelectedFile(file);
  };

  // const handleSubmit = () => {
  //   form
  //     .validateFields()
  //     .then((values) => {
  //       handleUpdate(values);
  //       toast.success("Cập nhật sản phẩm thành công!");
  //     })
  //     .catch((info) => {
  //       console.error("Validation Failed:", info);
  //     });
  // };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      if (!values.id) {
        toast.error("Lỗi: Không tìm thấy ID sản phẩm!");
        return;
      }
      formData.append("id", values.id);
      // Thêm dữ liệu sản phẩm vào formData
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      // Nếu có ảnh, thêm vào formData
      if (selectedFile) {
        formData.append("AttachmentFile", selectedFile);
      }

      handleUpdate(formData);
      form.resetFields();
      handleCancel();
      toast.success("Cập nhật sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      toast.error("Lỗi sản phẩm!");
    }
  }

  return (
    <Modal
      title="Cập nhật sản phẩm"
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
          label="Loại sản phẩm"
          name="categoryId"
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
          name="skinTypeId"
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
          label="Trạng thái"
          name="productStatus"
          rules={[{ required: true, message: "Vui lòng nhập câu hỏi!" }]}
        >
          <Select>
            <Select.Option value="Available">Available</Select.Option>
            <Select.Option value="Inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>

          <Image style={{ width: 100, height: 100, objectFit: "cover" }} />

        <Form.Item
          name="AttachmentFile"
        >
          <Upload
            beforeUpload={() => false}
            showUploadList={true}
            accept="image/*"
            onChange={handleUploadImage}
          >
            <Button icon={<FaPlus />}> Chon anh</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdateProduct;
