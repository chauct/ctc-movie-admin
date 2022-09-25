import {
  Button,
  Cascader,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import styles from "./style.module.css";
import React, { useEffect, useState } from "react";
import instance from "api/instance";
import { result } from "lodash";
import { useFormik } from "formik";
import moment from "moment";
import { GROUPID } from "common/utils/Setting";
import { useDispatch } from "react-redux";
import { createScheduleMoviesAction } from "features/cinemaManagement/action";
import Swal from "sweetalert2";
const { Option } = Select;

function Showtime(props) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      console.log({ values });
      try {
        const res = await instance.request({
          url: "/api/QuanLyDatVe/TaoLichChieu",
          method: "POST",
          data: values,
        });
        Swal.fire({
          title: res.data.content,
          icon: "success",
          confirmButtonColor: "#1c7403",
        });

        console.log("result", res.data.content);
      } catch (err) {
        console.log("errors", err.response?.data);
        Swal.fire({
          title: "Tạo thất bại!",
          text: `${err.response?.data.content}`,
          icon: "error",
        });
      }
    },
  });

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRap: [],
  });

  const fetchThongTinHeThongRap = async () => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyRap/LayThongTinHeThongRap",
        method: "GET",
      });

      setState({
        ...state,
        heThongRapChieu: res.data.content,
      });
    } catch (err) {
      console.log("errors", err.response?.data.content);
    }
  };
  useEffect(() => {
    fetchThongTinHeThongRap();
  }, []);

  const handleChangeHeThongRap = async (value) => {
    // từ ht rạp call api lấy thông tin rap
    console.log("mã hệ thống", value);
    try {
      const res = await instance.request({
        url: "/api/QuanLyRap/LayThongTinCumRapTheoHeThong",
        method: "GET",
        params: {
          maHeThongRap: value,
        },
      });
      // gán gt vào cụm rạp
      setState({
        ...state,
        cumRap: res.data.content,
      });
      console.log(res, "fhhfh");
    } catch (err) {
      console.log("errors", err.response?.data.content);
    }
  };

  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };

  // form
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //   datetime
  const onChangeDate = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const onOk = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };
  //   select price
  const handleChangePrice = (value) => {
    // console.log(`selected ${value}`);
    formik.setFieldValue("giaVe", value);
  };

  const onChangeInputNumber = (value) => {
    formik.setFieldValue("giaVe", value);
  };

  let movies = {};
  if (localStorage.getItem("movieParams")) {
    movies = JSON.parse(localStorage.getItem("movieParams"));
  }

  return (
    <>
      <h1 className="title">Tạo Lịch Chiếu Phim</h1>
      <Row>
        <Col offset={2} span={6}>
          <img
            src={movies.hinhAnh}
            alt=""
            width={250}
            height={350}
            style={{ objectFit: "cover" }}
          />
          <h2 className={styles.titleMovie}>{props.match.params.tenphim}</h2>
        </Col>
        <Col span={16} className={styles.form}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 14,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            onSubmitCapture={formik.handleSubmit}
          >
            <Form.Item label="Hệ thống rạp">
              <Select
                options={state.heThongRapChieu?.map((item, index) => ({
                  label: item.tenHeThongRap,
                  value: item.maHeThongRap,
                }))}
                onChange={handleChangeHeThongRap}
                placeholder="Chọn hệ thống rạp"
              />
            </Form.Item>
            <Form.Item label="Cụm rạp">
              <Select
                options={state.cumRap?.map((item, index) => ({
                  label: item.tenCumRap,
                  value: item.maCumRap,
                }))}
                onChange={handleChangeCumRap}
                placeholder="Chọn cụm rạp"
              />
            </Form.Item>
            <Form.Item label="Ngày chiếu, giờ chiếu">
              <DatePicker
                format="DD/MM/YYYY hh:mm:ss"
                showTime
                onChange={onChangeDate}
                onOk={onOk}
              />
            </Form.Item>
            <Form.Item label="Loại giá">
              <Select onChange={handleChangePrice}>
                <Option value="75000">75000</Option>
                <Option value="100000">100000</Option>
                <Option value="120000">120000</Option>
                <Option value="150000">150000</Option>
              </Select>
              {/* <InputNumber
            min={75000}
            max={150000}
            onChange={onChangeInputNumber}
          /> */}
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
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Showtime;
