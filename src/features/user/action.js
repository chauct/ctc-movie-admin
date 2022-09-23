import instance from "api/instance";
import { history } from "app/App";
import { GROUPID } from "common/utils/Setting";
import { Redirect } from "react-router-dom";

// import history from "app/App";
import Swal from "sweetalert2";

// type
export const SET_LIST_USER = "user/SET_LIST_USER";
export const SET_INFO_MOVIES = "movie/SET_INFO_MOVIES";

// lấy ds user
export const fetchUsersAction = (user) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachNguoiDung",
        method: "GET",
        params: {
          maNhom: "GP07",
        },
      });
      dispatch({
        type: SET_LIST_USER,
        user: res.data.content,
      });
    } catch (err) {
      console.log("errors", err.response?.data);
    }
  };
};

// // thêm người dùng
export const fetchAddUserAction = (user) => {
  user.maNhom = GROUPID;
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/ThemNguoiDung",
        method: "POST",
        data: user,
      });
      Swal.fire({
        title: "Thêm thành công!",
        icon: "success",
        confirmButtonColor: "#1c7403",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(fetchUsersAction());
        }
      });

      console.log("result", res.data.content);
    } catch (err) {
      console.log("errors", err.response?.data);
      Swal.fire({
        title: "Thêm  thất bại!",
        text: `${err.response?.data}`,
        icon: "error",
      });
    }
  };
};

// // cập nhật phim ( lấy thông tin phim )
// export const fetchGetInfoMoviesAction = (movieId) => {
//   return async (dispatch) => {
//     try {
//       const res = await instance.request({
//         url: "/api/QuanLyPhim/LayThongTinPhim",
//         method: "GET",
//         params: {
//           MaPhim: movieId,
//         },
//       });
//       dispatch({
//         type: SET_INFO_MOVIES,
//         payload: res.data.content,
//       });
//     } catch (err) {
//       console.log("errors", err.response?.data);
//     }
//   };
// };

// // cập nhật phim (upload)
// export const fetchUpdateMoviesAction = (movieUpdate) => {
//   return async (dispatch) => {
//     try {
//       const res = await instance.request({
//         url: "/api/QuanLyPhim/CapNhatPhimUpload",
//         method: "POST",
//         data: movieUpdate,
//       });

//       if (res.status === 200) {
//         Swal.fire({
//           title: "Cập nhật thành công!",
//           icon: "success",
//           confirmButtonColor: "#1c7403",
//         }).then((res) => {
//           if (res.isConfirmed) {
//             dispatch(fetchMoviesAction());
//             // history.push("/admin/movie");
//             <Redirect to="/admin/movie" />;
//           }
//         });
//       }
//       // dispatch(fetchMoviesAction());
//     } catch (err) {
//       console.log("errors", err.response?.data);
//       Swal.fire({
//         title: "Cập nhật thất bại!",
//         text: `${err.response?.data}`,
//         icon: "error",
//       });
//     }
//   };
// };

// // xóa phim
// export const fetchDeleteMoviesAction = (movieId) => {
//   return async (dispatch) => {
//     try {
//       const res = await instance.request({
//         url: "/api/QuanLyPhim/XoaPhim",
//         method: "DELETE",
//         params: {
//           MaPhim: movieId,
//         },
//       });
//       if (res.status === 200) {
//         Swal.fire({
//           title: "Xóa thành công!",
//           icon: "success",
//           confirmButtonColor: "#1c7403",
//         }).then((res) => {
//           if (res.isConfirmed) {
//             dispatch(fetchMoviesAction());
//           }
//         });
//       }
//     } catch (err) {
//       console.log("errors", err.response?.data);
//     }
//   };
// };
