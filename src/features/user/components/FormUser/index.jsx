import React, { useEffect } from "react";
import { Modal, Row, Col, Form, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchInsertUserAction,
  fetchUpdateUserAction,
} from "features/user/action";
import styles from "./style.module.css";
const { Option } = Select;
export default function FormUser(props) {
  const dispatch = useDispatch();
  const userUpdate = props.userUpdate;
  // const infoUser = useSelector((state) => state.user.thongTinNguoiDung);
  // console.log({ userUpdate });
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.type === "update") {
      form.setFieldsValue({
        taiKhoan: userUpdate.taiKhoan,
        hoTen: userUpdate.hoTen,
        email: userUpdate.email,
        soDT: userUpdate.soDT,
        matKhau: userUpdate.matKhau,
        maLoaiNguoiDung: userUpdate.maLoaiNguoiDung,
      });
    } else {
      form.setFieldsValue({
        taiKhoan: "",
        hoTen: "",
        email: "",
        soDT: "",
        matKhau: "",
        maLoaiNguoiDung: "",
      });
    }
  }, [props.type, userUpdate]);

  const onFinish = (values) => {
    if (props.type === "insert") {
      dispatch(fetchInsertUserAction(values));
    }
    if (props.type === "update") {
      dispatch(fetchUpdateUserAction(values));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <div>
      <Modal
        title={
          <div className="modalTitle">
            <span className="modalInform">
              {props.type == "update"
                ? "CẬP NHẬT NGƯỜI DÙNG"
                : "THÊM NGƯỜI DÙNG"}
            </span>
          </div>
        }
        visible={props.show}
        footer={null}
        onCancel={props.close}
      >
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{}}
          onFinishFailed={onFinishFailed}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          <Form.Item
            label="Tài Khoản"
            name="taiKhoan"
            rules={[{ required: true, message: "Hãy nhập tài khoản!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật Khẩu"
            name="matKhau"
            rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Họ Tên"
            name="hoTen"
            rules={[{ required: true, message: "Hãy nhập họ tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số ĐT"
            name="soDT"
            rules={[{ required: true, message: "Hãy nhập số điện thoại!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Hãy nhập E-mail!",
              },
              {
                required: true,
                message: "E-mail không đúng định dạng !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Loại User"
            name="maLoaiNguoiDung"
            rules={[{ required: true, message: "Hãy chọn loại người dùng!" }]}
          >
            <Select onChange={handleChange}>
              <Option value="KhachHang">Khách Hàng</Option>
              <Option value="QuanTri">Quản Trị</Option>
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button danger htmlType="submit" className={styles.btn_submit}>
              Submit
            </Button>
            <Button
              htmlType="button"
              onClick={onReset}
              className={styles.btn_cancel}
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
