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
  const [selectedFile, setSelectedFile] = useState(null); 

  useEffect(() => {
    if (isModalOpen) {
      form.resetFields(); // Always reset form when modal opens
      setSelectedFile(null);
    }
  }, [isModalOpen]);

  const handleUploadImage = ({ file }) => {
    setSelectedFile(file);
  };

  // const handleSubmit = () => {
  //   form
  //     .validateFields()
  //     .then((values) => {
  //       handleAdd({ ...values});
  //       toast.success("Thêm sản phẩm mới thành công!");
  //       form.resetFields();
  //       // setImageUrl(null); // Reset image URL after submission
  //     })
  //     .catch((info) => {
  //       console.error("Validation Failed:", info);
  //     });
  // };

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

      // Gửi dữ liệu về `ManagerProduct`
      handleAdd(formData);
      form.resetFields();
      handleCancel(); // Đóng modal
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  // const handleUpload = async (file) => {
  //   setUploading(true);
  //   try {
  //     const formData = new FormData();
  //     formData.append("AttachmentFile", file);

  //     const response = await axios.post(
  //       "https://localhost:7088/api/product/createProduct",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     console.log("Upload Response:", response.data);

  //     if (response.data && response.data.imageUrl) {
  //       setImageUrl(response.data.imageUrl);
  //       form.setFieldsValue({ image: response.data.imageUrl });
  //       toast.success("Tải ảnh lên thành công!");
  //     } else {
  //       toast.error("Tải ảnh thất bại! Định dạng phản hồi không đúng.");
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi tải ảnh:", error.response?.data || error.message);
  //     toast.error("Lỗi khi tải ảnh lên! Vui lòng kiểm tra API.");
  //   } finally {
  //     setUploading(false);
  //   }
  // };

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
            <Button icon={<FaPlus />}> Chon anh</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddProduct;
