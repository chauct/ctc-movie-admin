import { Button, Input } from "antd";
import { useFormik } from "formik";
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { fetchSigninAction } from "features/auth/action";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

const schema = yup.object().shape({
  taiKhoan: yup.string().required("*Tài khoản không được bỏ trống"),

  matKhau: yup.string().required("*Mật khẩu không được bỏ trống"),
});

function Signin() {
  const user = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();

  // const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      const action = fetchSigninAction(values);
      dispatch(action);
      console.log({ values });
    },
    validationSchema: schema,
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.signin}>
        <h2>Đăng nhập</h2>
        <form onSubmit={formik.handleSubmit}>
          <Input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="taiKhoan"
            className={styles.input}
            type="text"
            placeholder="Tên Tài Khoản"
          />
          {formik.touched.taiKhoan && formik.errors.taiKhoan && (
            <span className={styles.errorText}>{formik.errors.taiKhoan}</span>
          )}
          <Input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="matKhau"
            className={styles.input}
            type="password"
            placeholder="Mật Khẩu"
          />
          {formik.touched.matKhau && formik.errors.matKhau && (
            <span className={styles.errorText}>{formik.errors.matKhau}</span>
          )}

          <Button
            // loading={isLoading}
            htmlType="submit"
            type="primary"
            className={styles.btn_signin}
          >
            Đăng Nhập
          </Button>
          <p className={styles.register}>
            Quý khách chưa có Tài khoản?
            <NavLink className={styles.navLink} to="/signup">
              Đăng Ký
            </NavLink>
          </p>
          <a href="#">Quên Mật khẩu?</a>
        </form>
      </div>
    </div>
  );
}

export default Signin;
