/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from "react";

import { RightCircleOutlined } from "@ant-design/icons";
import { Row, Col, Typography, List, Badge } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { useMount } from "react-use";

import SpinWrapper from "@app/components/atoms/SpinWrapper/SpinWrapper";
import ContentLayout from "@app/components/layouts/ContentLayout/ContentLayout";
import useSearchParams from "@app/hooks/useSearchParams";
import { useAppDispatch, useAppSelector } from "@app/redux/store";

import { Countries, TopCountries } from "../../constants/home.paths";
import {
  getCountries,
  getCountryWisePrediction,
  getPrediction,
  getGlobalPrediction,
} from "../../redux/home.slice";
import styles from "./HomeScreen.module.scss";
import FeatureTable from "./components/FeatureTable/FeatureTable";
import Filter from "./components/Filter/Filter";
import AdvancedSearchForm from "./components/Form/AdvancedSearchForm";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  BarElement
);

const HomeScreen = () => {
  const { Title, Text } = Typography;
  const { search } = useSearchParams<any>();

  const {
    countries,
    predictionResults,
    topCountriesPrediction,
    globalPrediction,
    features,
    loading,
    loadingGlobal,
  } = useAppSelector(state => ({
    countries: state.home.countries,
    predictionResults: state.home.predictionResults,
    topCountriesPrediction: state.home.topCountriesPrediction,
    globalPrediction: state.home.globalPrediction,
    features: Object.values(state.home.features),
    loading: state.home.loading,
    loadingGlobal: state.home.loadingGlobal,
  }));
  const dispatch = useAppDispatch();

  useMount(() => {
    dispatch(getCountries());
  });

  const fetchData = useCallback(() => {
    dispatch(
      getPrediction({ year: search?.year, country_id: search?.country_id })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, search?.year, search?.country_id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useMount(() => {
    dispatch(getGlobalPrediction());
  });

  useMount(() => {
    TopCountries.forEach(country => {
      dispatch(
        getCountryWisePrediction({
          year: "2027",
          country_id: country?.country_id.toString(),
        })
      );
    });
  });

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "CO2 Emission Prediction",
      },
    },
    lineTension: 0.3,
  };

  const dataLineChart = {
    labels: predictionResults?.predictions?.map(
      (prediction: any) => prediction.year
    ),
    datasets: [
      {
        label: "CO2 emissions (metric tons per capita)",
        data: predictionResults?.predictions?.map(
          (prediction: any) => prediction.co2_per_capita
        ),
        borderColor: "rgba(24, 144, 255)",
        backgroundColor: "rgba(24, 144, 255, 0.5)",
        pointStyle: "circle",
        pointRadius: 8,
        pointHoverRadius: 12,
        fill: true,
      },
    ],
  };

  const dataGlobalLineChart = {
    labels: globalPrediction?.map((prediction: any) => prediction.year),
    datasets: [
      {
        label: "CO2 emissions (metric tons per capita)",
        data: globalPrediction?.map(
          (prediction: any) => prediction.co2_per_capita
        ),
        borderColor: "rgba(24, 144, 255)",
        backgroundColor: "rgba(24, 144, 255, 0.5)",
        pointStyle: "circle",
        pointRadius: 8,
        pointHoverRadius: 12,
        fill: true,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const drawCountryLineChart = (countryPredictionResult: any) => {
    const dataBarChart = {
      labels: countryPredictionResult?.predictions?.map(
        (prediction: any) => prediction.year
      ),
      datasets: [
        {
          label: "CO2 emissions (metric tons per capita)",
          data: countryPredictionResult?.predictions?.map(
            (prediction: any) => prediction.co2_per_capita
          ),
          borderColor: "rgba(24, 144, 255)",
          backgroundColor: "rgba(24, 144, 255, 0.5)",
        },
      ],
    };

    return (
      <Col span={8} key={countryPredictionResult?.country_id}>
        <div className={styles.card}>
          <Text>
            {
              TopCountries.find(
                country =>
                  country.country_id === countryPredictionResult.country_id
              )?.name
            }
          </Text>
          <Bar options={barOptions} data={dataBarChart} />
        </div>
      </Col>
    );
  };

  const getCountryName = () => {
    const country: any = countries.find(
      count => count.id === predictionResults.country_id
    );
    return country?.name;
  };

  return (
    <ContentLayout
      header={{ title: "Carbon Emission Prediction" }}
      filters={<Filter />}
    >
      <div className={styles.chartContainer}>
        <SpinWrapper loading={loading}>
          <Row justify="center" gutter={24}>
            <Col span={12}>
              <div className={styles.card}>
                <Title level={3} className={styles.title}>
                  Predicted CO<sub>2</sub> emissions (metric tons per capita) of{" "}
                  {getCountryName()}
                </Title>
                <Line options={lineOptions} data={dataLineChart} />
              </div>
            </Col>
            <Col span={12}>
              <div className={styles.card}>
                <Title level={5} className={styles.title}>
                  List of Features
                </Title>
                <div className={styles.listContent}>
                  <List
                    size="small"
                    dataSource={features}
                    renderItem={(item: any) => (
                      <List.Item>
                        <div className={styles.listItem}>
                          <RightCircleOutlined
                            style={{
                              fontSize: "20px",
                              color: "#08c",
                              marginRight: "16px",
                            }}
                          />
                          <Text>{item}</Text>
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </SpinWrapper>
      </div>

      <div className={styles.featureContainer}>
        <SpinWrapper loading={loading}>
          <Row justify="center" gutter={24}>
            <Col span={24}>
              <div className={styles.card}>
                <Title level={3} className={styles.title}>
                  Used Feature Variables for the Prediction of{" "}
                  {getCountryName()}
                </Title>
                <FeatureTable />
              </div>
            </Col>
          </Row>
        </SpinWrapper>
      </div>

      <div className={styles.countriesContainer}>
        <Title level={3} className={styles.title}>
          Predicted CO<sub>2</sub> Emissions (metric tons per capita) of Top 6
          Countries
        </Title>
        <Row justify="center" gutter={[16, 16]}>
          {topCountriesPrediction.map((prediction: any) =>
            drawCountryLineChart(prediction)
          )}
        </Row>
      </div>

      <div className={styles.globalContainer}>
        <Title level={3} className={styles.title}>
          Global Mean Predicted CO<sub>2</sub> Emissions (metric tons per
          capita) of Top 15 Countries
        </Title>
        <SpinWrapper loading={loadingGlobal}>
          <Row justify="center" gutter={24}>
            <Col span={14}>
              <div className={styles.card}>
                <Line options={lineOptions} data={dataGlobalLineChart} />
              </div>
            </Col>
            <Col span={10}>
              <div className={styles.countryList}>
                {Countries.map(country => (
                  <div key={country}>
                    <Badge color="volcano" text={country} />
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </SpinWrapper>
      </div>

      <div className={styles.predictionContainer}>
        <Title level={3} className={styles.title}>
          CO<sub>2</sub> Emission (per capita) Prediction (Advanced)
        </Title>
        <Row>
          <Col span={24}>
            <AdvancedSearchForm />
          </Col>
        </Row>
      </div>
    </ContentLayout>
  );
};

export default HomeScreen;
