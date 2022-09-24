import instance from "api/instance";
import { history } from "app/App";
import { GROUPID } from "common/utils/Setting";
import { Redirect } from "react-router-dom";

// import history from "app/App";
import Swal from "sweetalert2";

// type
export const SET_LIST_USER = "user/SET_LIST_USER";
export const SET_INFO_USER = "user/SET_INFO_USER";

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
export const fetchInsertUserAction = (user) => {
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
        text: `${err.response?.data.content}`,
        icon: "error",
      });
    }
  };
};

// // cập nhật user ( lấy thông tin user )
export const fetchGetInfoUserAction = (thongTinNguoiDung) => {
  return async (dispatch) => {
    // console.log({ username });
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        method: "POST",
        // taiKhoan: username,
      });
      dispatch({
        type: SET_INFO_USER,
        payload: res.data.content,
      });
    } catch (err) {
      console.log("errors", err.response?.data.content);
    }
  };
};

// // cập nhật phim (upload)
export const fetchUpdateUserAction = (user) => {
  user.maNhom = GROUPID;
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method: "POST",
        data: user,
      });

      if (res.status === 200) {
        Swal.fire({
          title: "Cập nhật thành công!",
          icon: "success",
          confirmButtonColor: "#1c7403",
        }).then((res) => {
          if (res.isConfirmed) {
            dispatch(fetchUsersAction());
          }
        });
      }
    } catch (err) {
      console.log("errors", err.response?.data);
      Swal.fire({
        title: "Cập nhật thất bại!",
        text: `${err.response?.data.content}`,
        icon: "error",
      });
    }
  };
};

// // xóa phim
// export const fetchDeleteUserAction = (username) => {
//   return async (dispatch) => {
//     try {
//       const res = await instance.request({
//         url: "api/QuanLyNguoiDung/XoaNguoiDung",
//         method: "DELETE",
//         params: {
//           TaiKhoan: username,
//         },
//       });
//       if (res.status === 200) {
//         Swal.fire({
//           title: "Xóa thành công!",
//           icon: "success",
//           confirmButtonColor: "#1c7403",
//         }).then((res) => {
//           if (res.isConfirmed) {
//             dispatch(fetchUsersAction());
//           }
//         });
//       }
//     } catch (err) {
//       console.log("errors", err.response?.data);
//     }
//   };
// };
