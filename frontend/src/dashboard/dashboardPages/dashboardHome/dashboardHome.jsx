import axios from "axios";
import "./dashboardHome.scss";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../../dashboardComponents/dashboardNav/newDash";
import useAuth from "../../../hooks/useAuth";
import { Backend_Url } from "../../../../url";

export default function DashboardHome() {
  const [totalPets, setTotalPets] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdopted, setTotalAdopted] = useState(0);
  const [totalDog, setTotalDog] = useState(0);
  const [totalCat, setTotalCat] = useState(0);
  const [totalOthers, setTotalOthers] = useState(0);

  useAuth();

  useEffect(() => {
    axios
      .get(`${Backend_Url}/petfinder/get`)
      .then((res) => {
        const pets = res.data.getallpets;
        const numOfPets = pets.length;
        setTotalPets(numOfPets);
        console.log(numOfPets);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${Backend_Url}/petfinder/user/allUsers`)
      .then((res) => {
        const users = res.data.users;
        const numOfUsers = users.length;
        setTotalUsers(numOfUsers);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${Backend_Url}/petfinder/adopt/viewadoptionrequest`)
      .then((res) => {
        const req = res.data.viewReq;
        const numOfAdopted = req.length;
        setTotalAdopted(numOfAdopted);
        console.log(numOfAdopted);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${Backend_Url}/petfinder/dogs?category=Dog`)
      .then((res) => {
        const dog = res.data.dog;
        const numOfDog = dog.length;
        setTotalDog(numOfDog);
        console.log(numOfDog);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${Backend_Url}/petfinder/cats?category=Cat`)
      .then((res) => {
        const cat = res.data.cat;
        const numOfCat = cat.length;
        setTotalCat(numOfCat);
        console.log(numOfCat);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${Backend_Url}/petfinder/others?category=Other`)
      .then((res) => {
        const oth = res.data.others;
        const numOfOth = oth.length;
        setTotalOthers(numOfOth);
        console.log(numOfOth);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const barChartData = {
    labels: ["All Pets", "Adopted Pets"],
    datasets: [
      {
        label: "Pets",
        data: [totalPets, totalAdopted],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Dogs", "Cats", "Others"],
    datasets: [
      {
        label: "Pet Categories",
        data: [totalDog, totalCat, totalOthers],
        borderWidth: 1,
        backgroundColor: [
          "rgba(255,99,132,1)",
          "rgba(50,40,132,1)",
          "rgba(5,99,132,1)",
        ],
      },
    ],
  };

  return (
    <>
      <Sidebar />
      <div className="dashboard_home">
        <div className="container">
          <div className="cards">
            <Link to="/managepets">
              <div className="card">
                <div className="description">
                  <h1>{totalPets}</h1>
                  <p>Total Pets</p>
                </div>
                <img src="/dog.png" alt="Pets" />
              </div>
            </Link>

            <Link to="/manageusers">
              <div className="card">
                <div className="description">
                  <h1>{totalUsers}</h1>
                  <p>Total Users</p>
                </div>
                <img src="/user.png" alt="Pets" />
              </div>
            </Link>

            <div className="card">
              <div className="description">
                <h1>{totalAdopted}</h1>
                <p>Total Adopted Requests</p>
              </div>
              <img src="../adopted.png" alt="Pets" />
            </div>
          </div>
          <div className="chart_container">
            <div className="bar_chart">
              <Chart type="bar" data={barChartData} />
            </div>

            <div className="pie_chart">
              <Chart type="pie" data={pieChartData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
