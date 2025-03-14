import { Button, Form, Input, InputNumber, Modal, Select, Upload } from "antd";
import { FiPlus } from "react-icons/fi";
import useCategory from "../../../../Hooks/useCategory";
import useSkinType from "../../../../Hooks/useSkinType";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ModalProduct = ({
  isModalOpen,
  handleCancel,
  handleOk,
  updateProduct,
}) => {
  const [form] = Form.useForm();
  const { categories } = useCategory();
  const { skinTypes, loading, error } = useSkinType();

  useEffect(() => {
    if (updateProduct) {
      if (categories.length > 0 && skinTypes.length > 0) {
        form.setFieldsValue({
          ...updateProduct,
          CategoryId: updateProduct.CategoryId,
          SkinTypeId: updateProduct.SkinTypeId,
        });
      }
    } else {
      form.resetFields(); // Reset form when adding a new product
    }
  }, [updateProduct, categories, skinTypes]);
  

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const formattedValues = {
          ...values,
          CategoryId: values.CategoryId, // Ensure CategoryId stores ID
          SkinTypeId: values.SkinTypeId, // Ensure SkinTypeId stores ID
        };

        handleOk(formattedValues);
        toast.success("Thêm sản phẩm mới thành công!!!");
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <Modal
      title={updateProduct ? "Cập nhật sản phẩm" : "Tạo sản phẩm mới"}
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
          label="ID"
          name="id"
          hidden
         
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          label="Tên sản phẩm"
          name="productName"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input.TextArea style={{ minHeight: "40px" }} />
        </Form.Item>

        <Form.Item
          label="Giá tiền"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          label="Loại sản phẩm"
          name="CategoryId"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select
            loading={loading}
            placeholder="Chọn loại sản phẩm"
            disabled={categories.length === 0}
          >
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
          rules={[{ required: true, message: "Please select a skin type!" }]}
        >
          <Select
            loading={loading}
            placeholder="Chọn loại da"
            disabled={skinTypes.length === 0}
          >
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
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalProduct;
