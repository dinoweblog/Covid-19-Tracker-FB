import { useEffect, useState } from "react";
import CountryTable from "./CountryTable";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import "./Style/Style.css";
import Register from "./Register";
import Login from "./Login";
import { RiHome2Line } from "react-icons/ri";
import { getLogout } from "../Redux/Login/action";
import { Link } from "react-router-dom";
import { searchData } from "../Redux/Search/action";

export const Home = () => {
  Chart.register(...registerables);

  const [globalData, setGlobalData] = useState([]);
  const [active, setActive] = useState(true);
  const [countryData, setCountryData] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [allCountryName, setAllCountryName] = useState([]);
  const [date, setdate] = useState("");
  const [cname, setCname] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const dispatch = useDispatch();
  const [filterCountry, setfilterCountry] = useState({});

  const { user, profile, isAuthenticated } = useSelector(
    (state) => state.login
  );

  const { cases, label } = useSelector((state) => state.search);

  useEffect(() => {
    getAllData();
    getAllCountryName();
  }, []);

  useEffect(() => {
    if (cname != "" && date != "") {
      filterData();
      setActive(false);
      setCountryName("");
      dispatch(searchData(countryName));
    }
  }, [cname, date]);

  const getAllData = () => {
    fetch(`https://api.covid19api.com/summary`)
      .then((res) => res.json())
      .then((res) => {
        setGlobalData(res.Global);
        setCountryData(res.Countries);
      });
  };

  const getSingleCountryData = () => {
    dispatch(searchData(countryName));
  };

  const filterData = () => {
    fetch(
      `https://api.covid19api.com/country/${cname}?from=${date}T00:00:00Z&to=${date}T13:13:30Z`
    )
      .then((res) => res.json())
      .then((res) => {
        setfilterCountry({ ...res[0] });
      })
      .catch((error) => console.log(error));
  };

  const getAllCountryName = () => {
    fetch(`https://api.covid19api.com/countries`)
      .then((res) => res.json())
      .then((res) => {
        setAllCountryName([...res]);
      })
      .catch((error) => console.log(error));
  };

  const state = {
    labels: label,
    datasets: [
      {
        label: "Cases/Time",
        backgroundColor: "#0AA1DD",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: cases,
      },
    ],
  };

  return (
    <div className="container ">
      <div className="features_section">
        <div>
          <Link
            to={"/"}
            onClick={() => {
              setCname("");
              setdate("");
              setActive(true);
              setCountryName("");
              dispatch(searchData(countryName));
            }}
          >
            <RiHome2Line style={{ fontSize: "22px" }} />
          </Link>
        </div>
        <div className="login_section">
          {isAuthenticated === "true" ? (
            <div className="user_profile">{profile}</div>
          ) : (
            <div></div>
          )}
          {isAuthenticated === "false" ? (
            <div className="login_signup_btn">
              <button
                onClick={() => {
                  setIsOpen2(true);
                }}
              >
                Login
              </button>
              <span>/</span>
              <button
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Signup
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                dispatch(getLogout());
              }}
            >
              Logout
            </button>
          )}
        </div>
        {isOpen && <Register setIsOpen={setIsOpen} setIsOpen2={setIsOpen2} />}
        {isOpen2 && <Login setIsOpen2={setIsOpen2} setIsOpen={setIsOpen} />}
        <div className="filter_section">
          <p>Filter</p>
          <select
            value={cname}
            name=""
            id=""
            onChange={(e) => setCname(e.target.value)}
          >
            <option value={""}>Country</option>
            {allCountryName.map((e) => (
              <option value={e.Country}>{e.Country}</option>
            ))}
          </select>
          <input
            value={date}
            type="date"
            onChange={(e) => setdate(e.target.value)}
          />
        </div>
        <div className="search_section">
          <input
            type="text"
            value={countryName}
            placeholder="country..."
            onChange={(e) => setCountryName(e.target.value)}
          />
          <button
            className={countryName === "" ? "active" : ""}
            onClick={() => {
              getSingleCountryData();
              setActive(false);
              setCname("");
              setdate("");
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div className="global_section">
        <div>
          <h3 className="title">Total Confirmed Cases</h3>
          <h3>
            {Intl.NumberFormat("en-IN").format(globalData.TotalConfirmed)}
          </h3>
        </div>
        <div>
          <h3 className="title">Total Recovered</h3>
          <h3>
            {Intl.NumberFormat("en-IN").format(globalData.TotalRecovered)}
          </h3>
        </div>
        <div>
          <h3 className="title">Total Deaths</h3>
          <h3>{Intl.NumberFormat("en-IN").format(globalData.TotalDeaths)}</h3>
        </div>
      </div>

      {active ? (
        <div className="country_section">
          <div className="table_row table_title">
            <p>Country Name</p>
            <p>Total Confirmed</p>
            <p>Total Recovered</p>
            <p>Total Deaths</p>
          </div>
          <div className="table">
            {countryData.map((e, i) => {
              return (
                <CountryTable
                  key={i}
                  name={e.Country}
                  tcc={e.TotalConfirmed}
                  trc={e.TotalRecovered}
                  tdc={e.TotalDeaths}
                />
              );
            })}
          </div>
        </div>
      ) : cname != "" && date != "" ? (
        <div className="country_details_container">
          <div>
            <div className="country_name">
              <h2>{filterCountry.Country}</h2>
              {/* <p>{filterCountry.Date}</p> */}
            </div>
            <div>
              <h3 className="title">Total Active Cases</h3>
              <h3>{Intl.NumberFormat("en-IN").format(filterCountry.Active)}</h3>
            </div>
            <div>
              <h3 className="title">Total Confirmed Cases</h3>
              <h3>
                {Intl.NumberFormat("en-IN").format(filterCountry.Confirmed)}
              </h3>
            </div>
            <div>
              <h3 className="title">Total Recovered</h3>
              <h3>
                {Intl.NumberFormat("en-IN").format(filterCountry.Recovered)}
              </h3>
            </div>
            <div>
              <h3 className="title">Total Deaths</h3>
              <h3>{Intl.NumberFormat("en-IN").format(filterCountry.Deaths)}</h3>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {cases.length != 0 && label.length != 0 ? (
            <div className="search_content">
              <Bar
                data={state}
                options={{
                  title: {
                    display: true,
                    text: "Average Rainfall per month",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: "right",
                  },
                }}
              />
            </div>
          ) : (
            <div className="not_found">Not Found</div>
          )}
        </div>
      )}
    </div>
  );
};
