import { Button, Form, Input, InputNumber, Modal, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useCategory from "../../../../Hooks/useCategory";
import useSkinType from "../../../../Hooks/useSkinType";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const ModalAddProduct = ({ isModalOpen, handleCancel, handleAdd }) => {
  const [form] = Form.useForm();
  const { categories } = useCategory();
  const { skinTypes, loading } = useSkinType();
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      form.resetFields(); // Always reset form when modal opens
      setImageUrl(null); 
    }
  }, [isModalOpen]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        handleAdd({ ...values, image: imageUrl });
        toast.success("Thêm sản phẩm mới thành công!");
        form.resetFields();
        setImageUrl(null); // Reset image URL after submission
      })
      .catch((info) => {
        console.error("Validation Failed:", info);
      });
  };

  const handleUpload = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post("https://664dc6deede9a2b55654d26f.mockapi.io/quannvSE172057/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.data.url) {
        setImageUrl(response.data.url);
        form.setFieldsValue({ image: response.data.url });
        toast.success("Tải ảnh lên thành công!");
      } else {
        toast.error("Tải ảnh thất bại!");
      }

    } catch (error) {
      console.error("Lỗi khi tải ảnh:", error);
      toast.error("Lỗi khi tải ảnh lên!");
    }
  }

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
          label="Ảnh sản phẩm"
          name="image"
          rules={[{ required: true, message: "Vui lòng tải lên ảnh sản phẩm!" }]}
        >
          <Upload
            customRequest={({ file }) => handleUpload(file)}
            showUploadList={false}
            accept="image/*"
            disabled={uploading}
          >
            <Button icon={<FaPlus  />} loading={uploading}>
              {uploading ? "Đang tải..." : "Tải ảnh lên"}
            </Button>
          </Upload>

          {imageUrl && (
            <div style={{ marginTop: 10 }}>
              <img src={imageUrl} alt="Sản phẩm" style={{ width: "100%", maxHeight: 200 }} />
            </div>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddProduct;
