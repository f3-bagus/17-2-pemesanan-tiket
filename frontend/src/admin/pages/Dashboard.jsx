import React, { useEffect, useState } from "react";
import axios from "axios";
import { loadCSS, cleanUpFiles } from "../utils/loadFiles";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardCard = ({ jumlah, iconClass, judul, icon }) => {
  const getIconClass = (icon) => {
    switch (icon) {
      case "schedule":
        return "mdi mdi-calendar-month icon-item";
      case "movie":
        return "mdi mdi-movie icon-item";
      case "user":
        return "mdi mdi-account icon-item";
      default:
        return "mdi mdi-arrow-top-right icon-item";
    }
  };

  return (
    <div className="col-xl-4 col-sm-8 grid-margin stretch-card">
      <div className="card bg-dark text-light">
        <div className="card-body">
          <div className="row">
            <div className="col-9">
              <div className="d-flex align-items-center align-self-start">
                <h3 className="mb-0">{jumlah}</h3>
              </div>
            </div>
            <div className="col-3">
              <div className={`icon ${iconClass}`}>
                <span className={getIconClass(icon)}></span>
              </div>
            </div>
          </div>
          <h6 className="font-weight-normal text-light">{judul}</h6>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [moviesCount, setMoviesCount] = useState(0);
  const [schedulesCount, setSchedulesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    // Load CSS
    const cssPromises = [
      loadCSS("../assets/css/app.css"),
      loadCSS("../assets/css/bootstrap.css"),
      loadCSS("../assets/css/perfect-scrollbar.css"),
      loadCSS("../assets/css/Chart.min.css"),
    ];

    // Wait until all files are loaded
    Promise.all([...cssPromises])
      .then(() => console.log("Semua file telah dimuat dengan sukses"))
      .catch((error) => console.error("Kesalahan saat memuat file:", error));

    // Cleanup files when component unmounts
    return () => {
      cleanUpFiles([
        "app.css",
        "bootstrap.css",
        "perfect-scrollbar.css",
        "Chart.min.css",
      ]);
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/films")
      .then((response) => {
        const count = response.data.length;
        setMoviesCount(count); // Update moviesCount state with the count from API response
      })
      .catch((error) => {
        console.error("Error fetching movies count:", error);
      });

    // Fetch schedules count from API using axios
    axios
      .get("http://localhost:3000/api/schedules")
      .then((response) => {
        const count = response.data.length;
        // Assuming API returns an object with a count property
        setSchedulesCount(count); // Update schedulesCount state with the count from API response
      })
      .catch((error) => {
        console.error("Error fetching schedules count:", error);
      });

    // Fetch users count from API using axios
    axios
      .get("http://localhost:3000/api")
      .then((response) => {
        // Assuming API returns an object with a count property
        setUsersCount(response.data.count); // Update usersCount state with the count from API response
      })
      .catch((error) => {
        console.error("Error fetching users count:", error);
      });
  }, []);

  return (
    <div className="container-scroller">
      <Sidebar />
      <div className="container-fluid page-body-wrapper bg-black">
        <Navbar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <DashboardCard
                jumlah={moviesCount}
                iconClass="icon-box-danger"
                judul="Movies"
                icon="movie"
              />
              <DashboardCard
                jumlah={schedulesCount}
                iconClass="icon-box-warning"
                judul="Schedules"
                icon="schedule"
              />
              <DashboardCard
                jumlah={usersCount}
                iconClass="icon-box-primary"
                judul="Users"
                icon="user"
              />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
