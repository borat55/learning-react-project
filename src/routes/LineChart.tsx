import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface ILineProps {
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

function LineChart({ coinId }: ILineProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorial[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    }
  );
  console.log(data);
  return (
    <div>
      {isLoading ? (
        "Loading line chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => price.close) ?? [],
            },
          ]}
          height={350}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            grid: {
              show: false,
            },
            chart: {
              background: "transparente",
              toolbar: {
                tools: {
                  zoom: false,
                  zoomin: false,
                  zoomout: false,
                  pan: false,
                  reset: false,
                },
              },
            },
            xaxis: {
              axisTicks: { show: false },
              type: "datetime",
              categories: data?.map((date) =>
                new Date(date.time_close * 1000).toUTCString()
              ),
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
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#7986cb"], stops: [0, 100] },
            },
            colors: ["#18ffff"],
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

export default LineChart;
