import {
  DeleteOutlined,
  EditOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { Button, Col, Modal, Row, Table } from "antd";
import Showtime from "features/cinemaManagement/pages/Showtime";
import { fetchDeleteMoviesAction } from "features/movie/action";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import FormMovie from "../FormMovie";
import styles from "./style.module.css";

function TableMovie() {
  const movies = useSelector((state) => state.movie.movies);

  const history = useHistory();

  const dispatch = useDispatch();

  // modal thêm lịch chiếu
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
            <span
              className={styles.btn_edit}
              onClick={() => {
                history.push("/admin/movie/edit/" + movie.maPhim);
              }}
              // to={`/admin/movie/edit/${movie.maPhim}`}
            >
              <EditOutlined />
            </span>
            <span
              onClick={() => {
                // gọi action xóa

                Swal.fire({
                  title: `Bạn có chắc muốn xóa phim !`,
                  text: movie.tenPhim,
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#ad200d",
                  cancelButtonColor: "rgb(167 167 167)",
                  confirmButtonText: "OK",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(fetchDeleteMoviesAction(movie.maPhim));
                  }
                });
              }}
              className={styles.btn_delete}
            >
              <DeleteOutlined />
            </span>
            <span
              className={styles.btn_showtime}
              onClick={() => {
                history.push(
                  "/admin/movie/showtime/" + movie.maPhim + "/" + movie.tenPhim
                );
                localStorage.setItem("movieParams", JSON.stringify(movie));
              }}
            >
              <ScheduleOutlined />
            </span>
          </>
        );
      },
      width: "20%",
    },
  ];
  const data = movies;
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Row>
        <Button
          onClick={() => {
            // setIsFormOpen(true);
            history.push("/admin/movie/add");
          }}
          className={styles.btn_themPhim}
        >
          Thêm Phim
        </Button>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"maPhim"}
        sticky
      />

      {/* <Modal
        title="Tạo lịch chiếu"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Showtime />
      </Modal> */}
    </div>
  );
}

export default TableMovie;
