import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchTicker } from "../api";

const PriceTabRow = styled.div`
  min-width: 25vw;
  display: flex;
  justify-content: space-between;
  padding: 7px 0;
  gap: 10px;
`;

const Pricetab = styled.div`
  font-size: 18px;
  width: 35vw;
  height: 100px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 10px;
  padding: 15px;
`;

const Percentage = styled.div<IPercentage>`
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  font-weight: 700;
  color: ${(props) =>
    props.percentage > 0
      ? props.theme.upwardColor
      : props.percentage === 0
      ? props.theme.textColor
      : props.theme.downwardColor};
`;

interface IPercentage {
  percentage: number | string;
}

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
  const { isLoading, data } = useQuery<ITickersData>(
    coinId,
    () => fetchTicker(coinId),
    {
      refetchInterval: 5000,
    }
  );

  return (
    <div>
      {isLoading ? (
        "is loading..."
      ) : (
        <div>
          <PriceTabRow>
            <Pricetab>
              15m ago :
              <Percentage
                percentage={data?.quotes.USD.percent_change_15m ?? ""}
              >
                {data?.quotes.USD.percent_change_15m}%
              </Percentage>
            </Pricetab>

            <Pricetab>
              30m ago :
              <Percentage
                percentage={data?.quotes.USD.percent_change_30m ?? ""}
              >
                {data?.quotes.USD.percent_change_30m}%{" "}
              </Percentage>
            </Pricetab>
          </PriceTabRow>
          <PriceTabRow>
            <Pricetab>
              1h ago :
              <Percentage percentage={data?.quotes.USD.percent_change_1h ?? ""}>
                {data?.quotes.USD.percent_change_1h}%{" "}
              </Percentage>
            </Pricetab>

            <Pricetab>
              6h ago :
              <Percentage percentage={data?.quotes.USD.percent_change_6h ?? ""}>
                {data?.quotes.USD.percent_change_6h}%{" "}
              </Percentage>
            </Pricetab>
          </PriceTabRow>
          <PriceTabRow>
            <Pricetab>
              12h ago :
              <Percentage
                percentage={data?.quotes.USD.percent_change_12h ?? ""}
              >
                {data?.quotes.USD.percent_change_12h}%{" "}
              </Percentage>
            </Pricetab>

            <Pricetab>
              24h ago :
              <Percentage
                percentage={data?.quotes.USD.percent_change_24h ?? ""}
              >
                {data?.quotes.USD.percent_change_24h}%{" "}
              </Percentage>
            </Pricetab>
          </PriceTabRow>
        </div>
      )}
    </div>
  );
}

export default Price;
