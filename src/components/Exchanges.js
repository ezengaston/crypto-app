import React from "react";
import { Collapse, Row, Col, Avatar, Typography } from "antd";
import HTMLReactParser from "html-react-parser";
import millify from "millify";

import { useGetCryptoExchangesQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Panel } = Collapse;
const { Text } = Typography;

export default function Exchanges() {
  const { data, isFetching } = useGetCryptoExchangesQuery();
  const exchanges = data?.data?.exchanges;

  if (isFetching) {
    return <Loader />;
  }

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Market Share</Col>
      </Row>
      <Collapse>
        {exchanges.map((item) => (
          <Panel
            key={item.id}
            showArrow={false}
            header={
              <>
                <Col span={6}>
                  <Text>
                    <strong>{item.rank}</strong>
                  </Text>
                  <Avatar className="exchange-image" src={item.iconUrl} />
                  <Text>
                    <strong>{item.name}</strong>
                  </Text>
                </Col>
                <Col span={6}>${millify(item.volume)}</Col>
                <Col span={6}>{millify(item.numberOfMarkets)}</Col>
                <Col span={6}>{millify(item.marketShare)}%</Col>
              </>
            }
          >
            {item.description ? (
              HTMLReactParser(item.description)
            ) : (
              <a href={item.websiteUrl} target="_blank" rel="noreferrer">
                Find More Info
              </a>
            )}
          </Panel>
        ))}
      </Collapse>
    </>
  );
}
