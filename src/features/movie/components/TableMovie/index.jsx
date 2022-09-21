import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import FormMovie from "../FormMovie";
import styles from "./style.module.css";

function TableMovie() {
  const movies = useSelector((state) => state.movie.movies);

  const [isFormOpen, setIsFormOpen] = useState(false);

  console.log({ movies });
  // table
  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      render: (text) => {
        return <span>{text}</span>;
      },
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend"],
      sortOrder: "descend",
      width: "10%",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return -1;
        }
        return -1;
      },
      width: "20%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, movie, index) => {
        return (
          <>
            <img
              src={text}
              width={100}
              height={100}
              style={{ objectFit: "cover" }}
              alt={movie.tenPhim}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://picsum.photos/id/${index}/100/100`;
              }}
            />
          </>
        );
      },
      width: "10%",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (text) => {
        return <p>{text.substr(0, 150) + "..."}</p>;
      },
      width: "40%",
    },
    {
      title: "Action",
      render: (_, movie) => {
        return (
          <>
            <Button className={styles.btn_edit}>
              <EditOutlined />
            </Button>
            <Button className={styles.btn_delete}>
              <DeleteOutlined />
            </Button>
          </>
        );
      },
      width: "20%",
    },
  ];
  const data = movies;
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Row>
        <Button
          onClick={() => {
            setIsFormOpen(true);
          }}
          className={styles.btn_themPhim}
        >
          Thêm Phim
        </Button>
      </Row>
      <Table columns={columns} dataSource={data} onChange={onChange} />
      <FormMovie open={isFormOpen} />
    </div>
  );
}

export default TableMovie;
