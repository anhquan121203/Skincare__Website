import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  Typography,
} from "antd";
import useCategory from "../../../../Hooks/useCategory";
import useSkinType from "../../../../Hooks/useSkinType";
import { useEffect } from "react";
import "./ModalDetailProduct.css";

const ModalDetailProduct = ({ isModalOpen, handleCancel, selectedProduct }) => {
  const [form] = Form.useForm();
  const { categories } = useCategory();
  const { skinTypes, loading } = useSkinType();

  useEffect(() => {
    if (selectedProduct) {
      form.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct, form]);

  return (
    <Modal
      title="Chi tiết sản phẩm"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Đóng
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item name="id" hidden>
          <Input disabled />
        </Form.Item>

        <Form.Item label="Tên sản phẩm">
          <Typography.Text>
            {selectedProduct?.productName || "N/A"}
          </Typography.Text>
        </Form.Item>

        <Form.Item label="Mô tả">
          <Typography.Text>
            {selectedProduct?.description || "N/A"}
          </Typography.Text>
        </Form.Item>

        <Form.Item label="Giá tiền">
          <Typography.Text>
            {selectedProduct?.price.toLocaleString() || "N/A"} VND
          </Typography.Text>
        </Form.Item>

        <Form.Item label="Số lượng">
          <Typography.Text>
            {selectedProduct?.quantity || "N/A"}
          </Typography.Text>
        </Form.Item>

        <Form.Item label="Loại sản phẩm" >
          <Typography.Text>
            {selectedProduct?.categoryName || "N/A"}
          </Typography.Text>
        </Form.Item>

        <Form.Item label="Loại da">
          <Typography.Text>
            {selectedProduct?.skinTypeName || "N/A"}
          </Typography.Text>
        </Form.Item>

        <Form.Item label="Ngày sản xuất">
          <Typography.Text>
            {selectedProduct?.createdDate || "N/A"}
          </Typography.Text>
        </Form.Item>

        <Form.Item label="Ngày hết hạn">
          <Typography.Text>
            {selectedProduct?.expiredDate || "N/A"}
          </Typography.Text>
        </Form.Item>

        <Form.Item label="Trạng thái">
          <Typography.Text>
            {selectedProduct?.productStatus || "N/A"}
          </Typography.Text>
        </Form.Item>

        <Form.Item label="Người quản lí">
          <Typography.Text>
            {selectedProduct?.staffName || "N/A"}
          </Typography.Text>
        </Form.Item>

        <Form.Item label="Ảnh sản phẩm">
          <Image style={{width: 100, height: 100, objectFit: "cover"}} src={selectedProduct?.image || "N/A"} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalDetailProduct;
