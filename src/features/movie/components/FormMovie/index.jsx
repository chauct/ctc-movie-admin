import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Switch,
} from "antd";
import styles from "./style.module.css";
import TextArea from "antd/lib/input/TextArea";
import { useFormik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import * as yup from "yup";

const schema = yup.object().shape({
  tenPhim: yup.string().required("*Tên phim không được bỏ trống"),

  hinhAnh: yup.string().required("*Vui lòng chọn hình ảnh"),

  ngayKhoiChieu: yup.string().required("*Vui lòng chọn ngày khởi chiếu"),
  danhGia: yup.string().required("*Chọn điểm đánh giá "),
  trailer: yup.string().required("*Trailer không được bỏ trống "),
  moTa: yup.string().required("*Mô tả không được để trống  "),
});

function FormMovie() {
  const [imgSrc, setImgSrc] = useState("");

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      hinhAnh: {},
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
    },
    onSubmit: (values) => {
      console.log({ values });
    },
    validationSchema: schema,
  });
  // Closures function
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (e) => {
    // lấy ra được file từ e
    let file = e.target.files[0];
    if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif"
    ) {
      // Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        console.log(e.target.result);
        // hinh base64
        setImgSrc(e.target.result);
      };
      console.log({ file });
    }
    // đem dữ liệu lưu vào formik
    formik.setFieldValue("hinhAnh", file);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row>
      <Col span={8}>
        <form
          onSubmit={formik.handleSubmit}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Tên phim">
            <Input
              onBlur={formik.handleBlur}
              name="tenPhim"
              onChange={formik.handleChange}
            />
            {formik.touched.tenPhim && formik.errors.tenPhim && (
              <span className={styles.errorText}>{formik.errors.tenPhim}</span>
            )}
          </Form.Item>

          <Form.Item label="Hình ảnh">
            <input
              onBlur={formik.handleBlur}
              type="file"
              name="hinhAnh"
              onChange={handleChangeFile}
              accept="image/png, image/jpeg,image/jpg,image/gif"
            />
            <br />
            <br />
            <img width={100} height={100} src={imgSrc} alt="..." />
          </Form.Item>

          <Form.Item label="Bí danh" name="biDanh">
            <Input name="biDanh" onChange={formik.handleChange} />
          </Form.Item>

          <Form.Item label="Ngày KC" name="tenPhim">
            <DatePicker
              onBlur={formik.handleBlur}
              format={"DD/MM/YYYY"}
              onChange={handleChangeDatePicker}
            />
            {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu && (
              <span className={styles.errorText}>
                {formik.errors.ngayKhoiChieu}
              </span>
            )}
          </Form.Item>

          <Form.Item label="Đang chiếu" valuePropName="checked">
            <Switch onChange={handleChangeSwitch("dangChieu")} />
          </Form.Item>

          <Form.Item label="Sắp chiếu" valuePropName="checked">
            <Switch onChange={handleChangeSwitch("sapChieu")} />
          </Form.Item>

          <Form.Item label="Hot" valuePropName="checked">
            <Switch onChange={handleChangeSwitch("hot")} />
          </Form.Item>

          <Form.Item label="Đánh giá" name="danhGia">
            <InputNumber
              onBlur={formik.handleBlur}
              onChange={handleChangeInputNumber("danhGia")}
              min={1}
              max={10}
            />
            {formik.touched.danhGia && formik.errors.danhGia && (
              <span className={styles.errorText}>{formik.errors.danhGia}</span>
            )}
          </Form.Item>

          <Form.Item label="Trailer" name="trailer">
            <Input
              onBlur={formik.handleBlur}
              name="trailer"
              onChange={formik.handleChange}
            />
            {formik.touched.trailer && formik.errors.trailer && (
              <span className={styles.errorText}>{formik.errors.trailer}</span>
            )}
          </Form.Item>

          <Form.Item label="Mô tả" name="moTa">
            <TextArea
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              rows={4}
              name="moTa"
            />
            {formik.touched.moTa && formik.errors.moTa && (
              <span className={styles.errorText}>{formik.errors.moTa}</span>
            )}
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button className={styles.btn_submit} htmlType="submit">
              Submit
            </Button>
            <Button className={styles.btn_cancel} type="reset">
              Cancel
            </Button>
          </Form.Item>
        </form>
      </Col>
    </Row>
  );
}

export default FormMovie;
