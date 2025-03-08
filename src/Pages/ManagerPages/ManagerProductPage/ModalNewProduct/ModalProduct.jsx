import { Button, Form, Input, InputNumber, Modal, Select, Upload } from "antd";
import { FiPlus } from "react-icons/fi";
import useCategory from "../../../../Hooks/useCategory";
import useSkinType from "../../../../Hooks/useSkinType";
import { toast } from "react-toastify";

const ModalProduct = ({ isModalOpen, handleCancel, handleOk }) => {
  const [form] = Form.useForm();
  const { categories } = useCategory();
  const { skinTypes, loading, error } = useSkinType();

  // const handleSubmit = () => {
  //   form
  //     .validateFields()
  //     .then((values) => {
  //       handleOk(values);
  //       toast.success("Thêm sản phẩm mới thành công!!!")
  //       form.resetFields();
  //     })
  //     .catch((info) => {
  //       console.log("Validation Failed:", info);
  //     });
  // };

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
      title="Tạo sản phẩm mới!!!"
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
          rules={[
            {
              required: true,
              message: "Please select a category!",
            },
          ]}
        >
          <Select>
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
          rules={[
            {
              required: true,
              message: "Please select a skin type!",
            },
          ]}
        >
          <Select>
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
