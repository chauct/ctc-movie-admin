import {
  DesktopOutlined,
  FileOutlined,
  HddOutlined,
  InsertRowBelowOutlined,
  LaptopOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import logo from "assets/img/Logo-light.png";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import { NavLink, Route, useHistory } from "react-router-dom";
import styles from "./style.module.css";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_IN_ACTION } from "features/auth/action";
import Swal from "sweetalert2";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<img src={logo} alt="logo" width={160} />),
  getItem(<NavLink to="/admin">Dashboard</NavLink>, "1", <PieChartOutlined />),
  getItem("Notications", "2", <DesktopOutlined />),
  getItem(
    <NavLink to="/admin/user">Quản lý người dùng </NavLink>,
    "sub1",
    <UserOutlined />
  ),
  getItem(
    <NavLink to="/admin/movie">Quản lý phim</NavLink>,
    "sub2",
    <InsertRowBelowOutlined />,
    [getItem(<NavLink to="/admin/movie/add">Thêm Phim</NavLink>, "8")]
  ),
  getItem("Quản lý phòng vé ", "sub3", <LaptopOutlined />, [
    getItem(<NavLink to="/admin/schedule">Lịch Chiếu Phim</NavLink>, "5"),
  ]),
  getItem("Quản lý rạp ", "sub4", <HddOutlined />, [
    getItem(<NavLink to="/admin/list-cinema">Thông Tin Cụm Rạp</NavLink>, "6"),
    getItem(
      <NavLink to="/admin/shedule-cinema">Thông Tin Lịch Chiếu</NavLink>,
      "7"
    ),
    getItem("File", "8", <FileOutlined />),
  ]),
];

function AdminTemplate(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);

  const userLogin = useSelector((state) => state.auth.profile);

  const goToSignin = () => {
    history.push("/");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch({
      type: SIGN_IN_ACTION,
      payload: null,
    });
    goToSignin();
  };
  // // check
  if (!localStorage.getItem("token")) {
    Swal.fire("Thông báo", "Bạn chưa đăng nhập!", "Error");
    return <Redirect to="/" />;
  }

  if (userLogin.maLoaiNguoiDung === "KhachHang") {
    Swal.fire(
      "Thông báo",
      "Bạn không có quyền truy cập vào trang này!",
      "Error"
    );

    return <Redirect to="/" />;
  }
  return (
    <Route
      path={props.path}
      exact
      render={(propsRoute) => {
        return (
          <Layout
            style={{
              minHeight: "100vh",
            }}
          >
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              width={250}
            >
              <div className="logo" />
              <Menu
                theme="dark"
                defaultSelectedKeys={["1"]}
                mode="inline"
                items={items}
              />
            </Sider>
            <Layout className="site-layout">
              <Header
                className="site-layout-background"
                style={{
                  padding: 0,
                }}
              >
                <div className={styles.header}>
                  <UserOutlined /> {userLogin.taiKhoan}
                  <span style={{ marginLeft: 20 }} onClick={handleLogout}>
                    Đăng xuất
                  </span>
                </div>
              </Header>
              <Content
                style={{
                  margin: "0 16px",
                }}
              >
                <Breadcrumb
                  style={{
                    margin: "16px 0",
                  }}
                >
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    minHeight: 360,
                  }}
                >
                  <props.component {...propsRoute} />
                </div>
              </Content>
              <Footer
                style={{
                  textAlign: "center",
                }}
              >
                ©2022 fe72-ctc-movie
              </Footer>
            </Layout>
          </Layout>
        );
      }}
    />
  );
}

export default AdminTemplate;
