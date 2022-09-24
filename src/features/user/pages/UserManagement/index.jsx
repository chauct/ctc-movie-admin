import React, { useEffect, useState } from "react";

import { Col, Row, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";

import { UserOutlined } from "@ant-design/icons";
import TableUser from "features/user/components/TableUser";
import { fetchUsersAction } from "features/user/action";
const { Search } = Input;

export default function UserManagement() {
  const listUser = useSelector((state) => state.user.listUser);
  // console.log(listUser);
  const arrUser = listUser;

  const dispatch = useDispatch();

  const [q, setQ] = useState("");
  const onSearch = (value) => console.log(value);
  const fSearch = (rows) => {
    // return rows.filter((row) => row.tenPhim.toLowerCase().indexOf(q) > -1);
  };
  const handleChangeSearch = (e) => {
    console.log(e.target.value);
    setQ(e.target.value);
  };

  const fetchMovies = async () => {
    dispatch(fetchUsersAction());
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div>
      <Row>
        <Col span={6} style={{ marginRight: "10px" }}>
          <Search
            onSearch={onSearch}
            onChange={handleChangeSearch}
            defaultValue={q}
            placeholder="Tìm Kiếm Theo Tên Người dùng"
            prefix={<UserOutlined />}
          />
        </Col>
      </Row>
      <TableUser data={fSearch(arrUser)} />
    </div>
  );
}
