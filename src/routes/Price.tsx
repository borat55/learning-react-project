import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface IPriceProps {
  coinId: string;
}

interface IHistorial {
  time_open: string;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Price({ coinId }: IPriceProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data: priceInfo } = useQuery<IHistorial[]>(
    ["historialPrice", coinId],
    () => fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading the chart"
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data:
                priceInfo?.map((data) => ({
                  x: new Date(Number(data.time_open) * 1000),
                  y: [data.open, data.high, data.low, data.close],
                })) || [],
            },
          ]}
          height={400}
          options={{
            chart: {
              type: "candlestick",
              background: "transparante",
              toolbar: {
                show: true,
                tools: {
                  download: true,
                  pan: false,
                  reset: false,
                  zoom: false,
                  zoomin: false,
                  zoomout: false,
                },
              },
            },
            theme: { mode: isDark ? "dark" : "light" },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              labels: { formatter: (value: number) => `$${value.toFixed(0)}` },
              axisBorder: { show: false },
              axisTicks: { show: false },
              tooltip: { enabled: true },
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Price;
