import { Table } from "antd";
import { fetchThongTinHeThongRapAction } from "features/cinemaManagement/action";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";

function ThongTinCumRap() {
  const dispatch = useDispatch();
  const thongTinHeThongRap = useSelector(
    (state) => state.cinema.danhSachHeThongRap
  );

  const fetchThongTinHeThongRap = async () => {
    dispatch(fetchThongTinHeThongRapAction);
  };
  useEffect(() => {
    fetchThongTinHeThongRap();
  }, []);

  // table
  const columns = [
    {
      title: "Mã hệ thống rạp",
      dataIndex: "maHeThongRap",

      sorter: (a, b) => {
        let maHeThongRapA = a.maHeThongRap.toLowerCase().trim();
        let maHeThongRapB = b.maHeThongRap.toLowerCase().trim();
        if (maHeThongRapA > maHeThongRapB) {
          return -1;
        }
        return -1;
      },
      width: "20%",
    },
    {
      title: "Logo",
      dataIndex: "logo",
      render: (text, cinema, index) => {
        return (
          <>
            <img
              src={text}
              width={70}
              height={70}
              style={{ objectFit: "cover" }}
              alt={cinema.logo}
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
      title: "Tên hệ thống rạp",
      dataIndex: "tenHeThongRap",

      sorter: (a, b) => {
        let tenHeThongRapA = a.tenHeThongRap.toLowerCase().trim();
        let tenHeThongRapB = b.tenHeThongRap.toLowerCase().trim();
        if (tenHeThongRapA > tenHeThongRapB) {
          return -1;
        }
        return -1;
      },
      width: "20%",
    },

    {
      title: "Action",
      render: (_, cinema) => {
        return (
          <>
            <button
              className={styles.btn_themPhim}
              onClick={() => {
                // history.push("/admin/movie/edit/" + movie.maPhim);
              }}
            >
              Chi tiết
            </button>
          </>
        );
      },
      width: "15%",
    },
  ];
  const data = thongTinHeThongRap;
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={"maHeThongRap"}
        sticky
      />
    </div>
  );
}

export default ThongTinCumRap;
