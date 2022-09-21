import { AudioOutlined } from "@ant-design/icons";
import { Col, Row, Space } from "antd";
import Search from "antd/lib/transfer/search";
import styles from "./style.module.css";
import React from "react";

import { useDispatch } from "react-redux";

import { useEffect } from "react";

import TableMovie from "features/movie/components/TableMovie";
import { fetchMoviesAction } from "features/movie/action";

// search

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const onSearch = (value) => console.log(value);

function MovieManagement() {
  const dispatch = useDispatch();

  const fetchMovies = async () => {
    dispatch(fetchMoviesAction);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <Row>
        <Col span={8} style={{ marginBottom: 30 }}>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </Col>
      </Row>
      <TableMovie />
    </div>
  );
}

export default MovieManagement;
