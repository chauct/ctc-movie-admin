import { Col, Input, Row } from "antd";

import styles from "./style.module.css";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import TableMovie from "features/movie/components/TableMovie";
import { fetchMoviesAction } from "features/movie/action";

// search

const { Search } = Input;
function MovieManagement() {
  const dispatch = useDispatch();

  const movie = useSelector((state) => state.movie.movies);
  console.log(movie);
  const arrFilm = movie;
  const [q, setQ] = useState("");
  const onSearch = (value) => console.log(value);
  const fSearch = (rows) => {
    return rows.filter((row) => row.tenPhim.toLowerCase().indexOf(q) > -1);
  };
  const handleChangeSearch = (e) => {
    console.log(e.target.value);
    setQ(e.target.value);
  };

  const fetchMovies = async () => {
    dispatch(fetchMoviesAction);
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  // search

  return (
    <div>
      <Row>
        <Col span={8} style={{ marginBottom: 30 }}>
          {/* <Search
            onSearch={onSearch}
            onChange={handleChangeSearch}
            defaultValue={q}
            placeholder="Tìm kiếm phim theo tên"
            allowClear
            enterButton="Search"
            size="large"
          /> */}
          <Search
            onSearch={onSearch}
            onChange={handleChangeSearch}
            defaultValue={q}
            placeholder="Tìm Kiếm Phim Theo Tên Phim"
          />
        </Col>
      </Row>
      <TableMovie data={fSearch(arrFilm)} />
    </div>
  );
}

export default MovieManagement;
