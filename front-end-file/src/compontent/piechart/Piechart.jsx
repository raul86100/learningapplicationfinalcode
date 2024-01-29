import React from "react";
import "./Piechart.css";
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

function Piechart(props) {
  const { dataobj } = props;
  console.log(dataobj.label);
  console.log(dataobj.datasets[0].backgroundColor[0]);

  return (
    <div className="wholechart">
      <div className="labelflex">
        
      <div className="footindash"><h1>Progress</h1></div>
        <div className="chart">
          <Doughnut data={dataobj} />
        </div>
        
      </div>
    </div>
  );
}

export default Piechart;
