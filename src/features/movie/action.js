import instance from "api/instance";
import { Swal } from "sweetalert2";
export const SET_MOVIES = "movie/SET_MOVIES";
export const SET_INFO_MOVIES = "movie/SET_INFO_MOVIES";

// lấy ds phim
export const fetchMoviesAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyPhim/LayDanhSachPhim",
      method: "GET",
      params: {
        maNhom: "GP07",
      },
    });
    dispatch({
      type: SET_MOVIES,
      payload: res.data.content,
    });
  } catch (err) {
    console.log("errors", err.response?.data);
  }
};

// thêm phim
export const fetchInsertMoviesAction = (movieInsert) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyPhim/ThemPhimUploadHinh",
        method: "POST",
        data: movieInsert,
      });
      // Swal.fire({
      //   title: "Thêm thành công!",
      //   icon: "success",
      //   confirmButtonColor: "#44c020",
      // });
      // Swal.fire("Thông báo", "Thêm thành công!", "success");
      alert("Thêm phim thành công!");
      console.log("result", res.data.content);
    } catch (err) {
      console.log("errors", err.response?.data);
    }
  };
};
// cập nhật phim ( lấy thông tin phim )
export const fetchGetInfoMoviesAction = (movieId) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyPhim/ThemPhimUploadHinh",
        method: "GET",
        MaPhim: movieId,
      });
      dispatch({
        type: SET_INFO_MOVIES,
        payload: res.data.content,
      });

      // alert("Thêm phim thành công!");
    } catch (err) {
      console.log("errors", err.response?.data);
    }
  };
};
