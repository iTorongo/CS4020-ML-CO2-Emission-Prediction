/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from "react";

import { Select, Slider } from "antd";

import PageFilter, {
  FilterItem,
} from "@app/components/molecules/PageFilter/PageFilter";
import { useAppSelector } from "@app/redux/store";

import styles from "./Filter.module.scss";

const { Option } = Select;

export interface FilterProps {
  // eslint-disable-next-line camelcase
  country_id?: string;
  year?: string;
}

const Filter = () => {
  const { countries, loading } = useAppSelector(state => ({
    countries: state.home.countries,
    loading: state.home.loading,
  }));

  return (
    <PageFilter<any>
      showSubmitButton
      showResetButton
      parseNumbers={["country_id"]}
    >
      <FilterItem label="Select Country or Region" name="country_id">
        <Select
          placeholder="Select Country"
          allowClear
          loading={loading}
          defaultValue={153}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {countries.map(country => (
            <Option key={country.id} value={country.id}>
              {country.name}
            </Option>
          ))}
        </Select>
      </FilterItem>
      <FilterItem
        label="Select Year Range (2022-2030)"
        name="year"
        className={styles.slider}
      >
        <Slider min={2022} max={2030} defaultValue={2030} tooltipVisible />
      </FilterItem>
    </PageFilter>
  );
};

export default memo(Filter);
