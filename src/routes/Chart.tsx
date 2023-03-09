import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import LineChart from "./LineChart";
import CandleChart from "./CandleChart";
import styled from "styled-components";

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  width: 45vw;
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.cardColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const LineMatch = useRouteMatch("/:coinId/chart/lineChart");
  const CandleMatch = useRouteMatch("/:coinId/chart/candleChart");

  return (
    <div>
      <Switch>
        <Route path={`/:${coinId}/chart/linechart`}>
          <LineChart coinId={coinId} />
        </Route>
        <Route path={`/:${coinId}/chart/candlechart`}>
          <CandleChart coinId={coinId} />
        </Route>
      </Switch>
      <div>
        <Tabs>
          <Tab isActive={LineMatch !== null}>
            <Link to={`/${coinId}/chart/linechart`}>Line Chart</Link>
          </Tab>
          <Tab isActive={CandleMatch !== null}>
            <Link to={`/${coinId}/chart/candlechart`}>Candle Chart</Link>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Chart;
