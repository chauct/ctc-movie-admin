import instance from "api/instance";
import Swal from "sweetalert2";

export const SET_LAY_THONG_TIN_HT_RAP = "cinema/SET_LAY_THONG_TIN_HT_RAP";

export const fetchThongTinHeThongRapAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyRap/LayThongTinHeThongRap",
      method: "GET",
    });

    // dispatch({
    //   type: SET_LAY_THONG_TIN_HT_RAP,
    //   payload: res.data.content,
    // });

    // console.log("result", res.data.content);
  } catch (err) {
    console.log("errors", err.response?.data.content);
  }
};
export const createScheduleMoviesAction = (thongTinLichChieu) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyDatVe/TaoLichChieu",
        method: "POST",
        data: thongTinLichChieu,
      });
      Swal.fire({
        title: "Tạo thành công!",
        icon: "success",
        confirmButtonColor: "#1c7403",
      });

      console.log("result", res.data.content);
    } catch (err) {
      console.log("errors", err.response?.data);
      Swal.fire({
        title: "Tạo thất bại!",
        text: `${err.response?.data.content}`,
        icon: "error",
      });
    }
  };
};
