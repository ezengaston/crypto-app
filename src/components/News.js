import React, { useState, useEffect } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

export default function News({ simplified }) {
  const [isLoading, setIsLoading] = useState(true);
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);

  const count = simplified ? 6 : 12;
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });

  useEffect(() => {
    if (cryptoNews?.news) {
      setIsLoading(false);
    }
  }, [cryptoNews]);

  const renderNotFound = () => {
    if (cryptoNews?.news?.length > 0) return null;

    return <Title className="not-found">Not Found</Title>;
  };

  if (isLoading) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified ? (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => {
              setIsLoading(true);
              setNewsCategory(value);
            }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin, index) => (
              <Option key={index} value={coin.name}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      ) : null}
      {cryptoNews?.news?.map((news, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img
                  src={news?.image || demoImage}
                  alt="news"
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                />
              </div>
              <p>
                {news.body > 100
                  ? `${news.body.substring(0, 100)}...`
                  : news.body}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news?.provider?.[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt="news"
                  />
                  <Text className="provider-name">{news.source}</Text>
                </div>
                <Text>{moment(news.date).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
      <Col span={24}>{renderNotFound()}</Col>
    </Row>
  );
}
