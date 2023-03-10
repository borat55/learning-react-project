import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface ICandleProps {
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

function CandleChart({ coinId }: ICandleProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data: priceInfo } = useQuery<IHistorial[]>(
    ["historialPrice", coinId],
    () => fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading candlestick chart..."
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
              labels: {
                formatter: (value: number) => {
                  if (value < 1) {
                    return `$${value.toFixed(7)}`;
                  } else if (value < 2) {
                    return `$${value.toFixed(4)}`;
                  } else {
                    return `$${value.toFixed(0)}`;
                  }
                },
              },
              axisBorder: { show: false },
              axisTicks: { show: false },
              tooltip: { enabled: true },
            },
            tooltip: {
              y: {
                formatter: (value) => {
                  if (value < 1) {
                    return `$${value.toFixed(7)}`;
                  } else if (value < 2) {
                    return `$${value.toFixed(4)}`;
                  } else {
                    return `$${value.toFixed(0)}`;
                  }
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default CandleChart;
