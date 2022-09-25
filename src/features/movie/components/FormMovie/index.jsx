import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import styles from "./style.module.css";
import TextArea from "antd/lib/input/TextArea";
import { useFormik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { fetchInsertMoviesAction } from "features/movie/action";
import { GROUPID } from "common/utils/Setting";

const schema = yup.object().shape({
  tenPhim: yup.string().required("*Tên phim không được bỏ trống"),

  hinhAnh: yup.mixed().nullable().required("*Vui lòng chọn hình ảnh"),

  ngayKhoiChieu: yup.string().required("*Vui lòng chọn ngày khởi chiếu"),
  danhGia: yup.string().required("*Chọn điểm đánh giá "),
  trailer: yup.string().required("*Trailer không được bỏ trống "),
  moTa: yup.string().required("*Mô tả không được để trống  "),
});

function FormMovie() {
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
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
      values.maNhom = GROUPID;
      // tạo đối tượng form data =>dưa giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      // goi api đưa formdata về backend xử lý
      dispatch(fetchInsertMoviesAction(formData));
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
    }
    // đem dữ liệu lưu vào formik
    formik.setFieldValue("hinhAnh", file);
  };
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <>
      <h1 className="title">Thêm Phim</h1>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
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

        <Form.Item label="Bí danh">
          <Input name="biDanh" onChange={formik.handleChange} />
        </Form.Item>

        <Form.Item label="Ngày KC">
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

        <Form.Item label="Đang chiếu">
          <Switch onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>

        <Form.Item label="Sắp chiếu">
          <Switch onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>

        <Form.Item label="Hot">
          <Switch onChange={handleChangeSwitch("hot")} />
        </Form.Item>

        <Form.Item label="Đánh giá">
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

        <Form.Item label="Trailer">
          <Input
            onBlur={formik.handleBlur}
            name="trailer"
            onChange={formik.handleChange}
          />
          {formik.touched.trailer && formik.errors.trailer && (
            <span className={styles.errorText}>{formik.errors.trailer}</span>
          )}
        </Form.Item>

        <Form.Item label="Mô tả">
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
          <button className={styles.btn_submit} type="submit">
            Thêm phim
          </button>
          {/* <button className={styles.btn_cancel} type="reset">
          Cancel
        </button> */}
        </Form.Item>
      </Form>
    </>
  );
}

export default FormMovie;
