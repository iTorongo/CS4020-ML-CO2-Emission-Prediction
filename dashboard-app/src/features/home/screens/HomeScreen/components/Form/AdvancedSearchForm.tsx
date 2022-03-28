import { Form, Row, Col, Input, Button, Select, Card, Statistic } from "antd";

import SpinWrapper from "@app/components/atoms/SpinWrapper/SpinWrapper";
import { useAppDispatch, useAppSelector } from "@app/redux/store";

import { features } from "../../../../constants/home.paths";
import { getManualPrediction } from "../../../../redux/home.slice";
import style from "./AdvancedSearchForm.module.scss";

const { Option } = Select;

const AdvancedSearchForm = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { countries, manualPrediction, loadingManual } = useAppSelector(
    state => ({
      countries: state.home.countries,
      manualPrediction: state.home.manualPrediction,
      loadingManual: state.home.loadingManual,
    })
  );

  const getFields = () => {
    const children: any = [];

    features?.forEach(feature => {
      children.push(
        <Col span={6} key={feature.key}>
          <Form.Item
            name={feature.key.toLowerCase()}
            label={feature.name}
            initialValue={feature.value}
            rules={[
              {
                required: true,
                message: "Input something!",
              },
            ]}
          >
            <Input placeholder="placeholder" />
          </Form.Item>
        </Col>
      );
    });

    return children;
  };

  const onFinish = (values: any) => {
    console.log(values);
    dispatch(getManualPrediction(values));
  };

  return (
    <>
      {!!manualPrediction && (
        <Row gutter={16} justify="center" className={style.predictionResult}>
          <Col span={8}>
            <Card className={style.resultCard}>
              <Statistic
                title="Predicted CO2 Emission (per capita)"
                value={manualPrediction?.co2_per_capita?.toFixed(5)}
                valueStyle={{ color: "#ff4d4f" }}
              />
            </Card>
          </Col>
        </Row>
      )}
      <Form
        form={form}
        name="advanced_search"
        onFinish={onFinish}
        layout="vertical"
        className={style.form}
      >
        <SpinWrapper loading={loadingManual}>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item
                name="country_id"
                label="Country"
                rules={[
                  {
                    required: true,
                    message: "Input something!",
                  },
                ]}
              >
                <Select allowClear style={{ textAlign: "left" }}>
                  {countries.map(country => (
                    <Option key={country.id} value={country.id}>
                      {country.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {getFields()}
          </Row>
          <Row justify="center">
            <Col span={24}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loadingManual}
              >
                Predict
              </Button>
            </Col>
          </Row>
        </SpinWrapper>
      </Form>
    </>
  );
};

export default AdvancedSearchForm;
