import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Row, Table } from "antd";
import { fetchDeleteUserAction } from "features/user/action";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import FormUser from "../FormUser";

import styles from "./style.module.css";

function TableUser() {
  const listUser = useSelector((state) => state.user.listUser);

  const history = useHistory();

  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [userUpdate, setUserUpdate] = useState({ userUpdate: [] });
  const [typeAction, setTypeAction] = useState("update");

  const handleCloseForm = () => setShowForm(false);
  // table
  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        let tenPhimA = a.taiKhoan.toLowerCase().trim();
        let tenPhimB = b.taiKhoan.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return -1;
        }
        return -1;
      },
      width: "20%",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        let tenPhimA = a.hoTen.toLowerCase().trim();
        let tenPhimB = b.hoTen.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return -1;
        }
        return -1;
      },
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",

      width: "20%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",

      width: "20%",
    },
    {
      title: "Mã loại người dùng",
      dataIndex: "maLoaiNguoiDung",

      width: "20%",
    },

    {
      title: "Action",
      render: (_, user) => {
        return (
          <>
            <span
              className={styles.btn_edit}
              onClick={() => {
                setTypeAction("update");
                setUserUpdate(user);
                setShowForm(true);
              }}
            >
              <EditOutlined />
            </span>
            <span
              onClick={() => {
                // gọi action xóa
                Swal.fire({
                  title: `Bạn có chắc muốn xóa người dùng `,
                  text: user.taiKhoan,
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#ad200d",
                  cancelButtonColor: "rgb(167 167 167)",
                  confirmButtonText: "OK",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(fetchDeleteUserAction(user.taiKhoan));
                  }
                });
              }}
              className={styles.btn_delete}
            >
              <DeleteOutlined />
            </span>
          </>
        );
      },
      width: "20%",
    },
  ];
  const data = listUser;
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Row>
        <Button
          onClick={() => {
            setTypeAction("insert");
            setShowForm(true);
          }}
          className={styles.btn_themPhim}
        >
          Thêm người dùng
        </Button>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"taiKhoan"}
        sticky
      />
      <FormUser
        show={showForm}
        close={handleCloseForm}
        userUpdate={userUpdate}
        type={typeAction}
      />
    </div>
  );
}

export default TableUser;
