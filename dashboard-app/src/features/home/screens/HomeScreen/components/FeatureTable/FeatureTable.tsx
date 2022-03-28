/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { Table, Typography } from "antd";

import TableView from "@app/components/molecules/TableView/TableView";
import { useAppSelector } from "@app/redux/store";

export enum UsersActionMenuEnum {
  DUPLICATE = "duplicate",
}

const { Text } = Typography;

const FeatureTable = () => {
  const [features, setFeatures] = useState<any>();
  const { predictionResults, loading } = useAppSelector(state => ({
    predictionResults: state.home.predictionResults,
    loading: state.home.loading,
  }));

  const filterFeatures = (result: any) => {
    const featureList = result.features.map((feature: any) => {
      const obj: any = {};
      obj[feature.feature_code] = {
        value: feature.value.toFixed(5),
        name: feature.feature_name,
      };
      return obj;
    });
    const featureObj = Object.assign({}, ...featureList);
    return featureObj;
  };

  const mapData = () => {
    return predictionResults?.predictions?.map((result: any) => {
      return {
        year: result.year,
        co2: result.co2_per_capita,
        ...filterFeatures(result),
      };
    });
  };

  useEffect(() => {
    const data = mapData();
    setFeatures(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [predictionResults]);

  mapData();
  return (
    <TableView
      dataSource={features}
      loading={loading}
      scroll={{ x: "calc(1700px + 50%)" }}
      pagination={false}
      hideActionColumn
    >
      <Table.Column
        title="Year"
        key="year"
        dataIndex="year"
        render={(year: any) => (
          <Text style={{ color: "#1890ff" }} strong>
            {year}
          </Text>
        )}
        fixed="left"
      />
      <Table.Column
        title="Air transport, freight (million ton-km)"
        key="AIR_TRANS_FREIGHT"
        dataIndex="AIR_TRANS_FREIGHT"
        render={(AIR_TRANS_FREIGHT: any) => AIR_TRANS_FREIGHT.value}
      />
      <Table.Column
        title="Alternative and nuclear energy (% of total energy use)"
        key="ALT_NUCL_EN_PERC"
        dataIndex="ALT_NUCL_EN_PERC"
        render={(ALT_NUCL_EN_PERC: any) => ALT_NUCL_EN_PERC.value}
      />
      <Table.Column
        title="Combustible renewables and waste (% of total energy)"
        key="COMB_REN_WASTE_PERC"
        dataIndex="COMB_REN_WASTE_PERC"
        render={(COMB_REN_WASTE_PERC: any) => COMB_REN_WASTE_PERC.value}
      />
      <Table.Column
        title="Electricity production from coal sources (% of total)"
        key="ELEC_PROD_COAL_PERC"
        dataIndex="ELEC_PROD_COAL_PERC"
        render={(ELEC_PROD_COAL_PERC: any) => ELEC_PROD_COAL_PERC.value}
      />
      <Table.Column
        title="Electricity production from hydroelectric sources (% of total)"
        key="ELEC_PROD_HYDRO_PERC"
        dataIndex="ELEC_PROD_HYDRO_PERC"
        render={(ELEC_PROD_HYDRO_PERC: any) => ELEC_PROD_HYDRO_PERC.value}
      />
      <Table.Column
        title="Electricity production from natural gas sources (% of total)"
        key="ELEC_PROD_NAT_GAS_PERC"
        dataIndex="ELEC_PROD_NAT_GAS_PERC"
        render={(ELEC_PROD_NAT_GAS_PERC: any) => ELEC_PROD_NAT_GAS_PERC.value}
      />
      <Table.Column
        title="Electricity production from oil sources (% of total)"
        key="ELEC_PROD_OIL_PERC"
        dataIndex="ELEC_PROD_OIL_PERC"
        render={(ELEC_PROD_OIL_PERC: any) => ELEC_PROD_OIL_PERC.value}
      />
      <Table.Column
        title="Energy use (kg of oil equivalent per capita)"
        key="EN_USE_PC"
        dataIndex="EN_USE_PC"
        render={(EN_USE_PC: any) => EN_USE_PC.value}
      />
      <Table.Column
        title="Fossil fuel energy consumption (% of total)"
        key="FOSSIL_FUEL_EN_CONS_PERC"
        dataIndex="FOSSIL_FUEL_EN_CONS_PERC"
        render={(FOSSIL_FUEL_EN_CONS_PERC: any) =>
          FOSSIL_FUEL_EN_CONS_PERC.value
        }
      />
      <Table.Column
        title="GDP per capita (current US$)"
        key="GDP_PC"
        dataIndex="GDP_PC"
        render={(GDP_PC: any) => GDP_PC.value}
      />

      <Table.Column
        title="Population growth (annual %)"
        key="POP_GROWTH_PERC"
        dataIndex="POP_GROWTH_PERC"
        render={(POP_GROWTH_PERC: any) => POP_GROWTH_PERC.value}
      />
      <Table.Column
        title="Population in urban agglomerations of more than 1 million (% of total population)"
        key="POP_URBAN_AGG"
        dataIndex="POP_URBAN_AGG"
        render={(POP_URBAN_AGG: any) => POP_URBAN_AGG.value}
      />
      <Table.Column
        title="Urban population growth (annual %)"
        key="URBAN_POP_GROWTH"
        dataIndex="URBAN_POP_GROWTH"
        render={(URBAN_POP_GROWTH: any) => URBAN_POP_GROWTH.value}
      />
      <Table.Column
        title="Urban population (% of total population)"
        key="URBAN_POP_TOTAL"
        dataIndex="URBAN_POP_TOTAL"
        render={(URBAN_POP_TOTAL: any) => URBAN_POP_TOTAL.value}
      />
      <Table.Column
        title="Methane emissions (kt of CO2 equivalent)"
        key="METHANE_EM"
        dataIndex="METHANE_EM"
        render={(METHANE_EM: any) => METHANE_EM.value}
      />
      <Table.Column
        title="Nitrous oxide emissions (thousand metric tons of CO2 equivalent)"
        key="NO2_EM"
        dataIndex="NO2_EM"
        render={(NO2_EM: any) => NO2_EM.value}
      />
      <Table.Column
        title="Total"
        key="co2"
        dataIndex="co2"
        render={(co2: any) => (
          <Text type="danger" strong>
            {co2}
          </Text>
        )}
        fixed="right"
        width="200px"
      />
    </TableView>
  );
};

export default FeatureTable;
