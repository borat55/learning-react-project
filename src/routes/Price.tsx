import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchTicker } from "../api";

const Pricetab = styled.div`
  min-width: 150px;
  height: 110px;
  margin: 10px;
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 10px;
  padding: 15px;
`;

const Percentage = styled.div`
  min-width: 150px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  font-weight: 700;
`;

interface IPriceProps {
  coinId: string;
}
interface ITickersData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
function Price({ coinId }: IPriceProps) {
  const { isLoading, data } = useQuery<ITickersData>(coinId, () =>
    fetchTicker(coinId)
  );
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
        margin: "0 auto",
      }}
    >
      <Pricetab>
        15m ago :
        <Percentage> {data?.quotes.USD.percent_change_15m}% </Percentage>
      </Pricetab>
      <Pricetab>
        30m ago :
        <Percentage>{data?.quotes.USD.percent_change_30m}% </Percentage>
      </Pricetab>
      <Pricetab>
        1h ago : <Percentage>{data?.quotes.USD.percent_change_1h}% </Percentage>
      </Pricetab>
      <Pricetab>
        6h ago : <Percentage>{data?.quotes.USD.percent_change_6h}% </Percentage>
      </Pricetab>
      <Pricetab>
        12h ago :
        <Percentage>{data?.quotes.USD.percent_change_12h}% </Percentage>
      </Pricetab>
      <Pricetab>
        24h ago :
        <Percentage>{data?.quotes.USD.percent_change_24h}% </Percentage>
      </Pricetab>
    </div>
  );
}

export default Price;
