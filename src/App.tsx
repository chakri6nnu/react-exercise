import React, { useEffect, useState } from "react";
import RangeSlider from "./components/RangeSlider";
import { ApplicationList } from "./components/ApplicationList";
import { fetchData } from "./services/dataService";
import "./styles/App.css";
import { TreeView } from "./components/TreeView";
import { ApplicationData } from "./modals";

const buildTree = (data: ApplicationData[]): any => {
  const tree: any = {};

  data.forEach((item) => {
    const { BCAP1, BCAP2, BCAP3, id, name, spend } = item;

    if (!tree[BCAP1]) {
      tree[BCAP1] = {};
    }
    if (!tree[BCAP1][BCAP2]) {
      tree[BCAP1][BCAP2] = {};
    }
    if (!tree[BCAP1][BCAP2][BCAP3]) {
      tree[BCAP1][BCAP2][BCAP3] = [];
    }
    tree[BCAP1][BCAP2][BCAP3].push({ id, name, spend });
  });

  return tree;
};
const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [treeData, setTreeData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedCapability, setSelectedCapability] = useState<any[]>([]);
  const [spendRange, setSpendRange] = useState<[number, number]>([0, 100000]);
  const handleRangeChange = (min: number, max: number) => {
    console.log("Selected range:", min, max);
    setSpendRange([min, max]);
  };

  useEffect(() => {
    fetchData().then((data) => {
      if (data) {
        setData(data);
        const treeData = buildTree(data);
        setTreeData(treeData);
      }
    });
  }, []);

  useEffect(() => {
    filterData();
  }, [data, selectedCapability, spendRange]);

  const filterData = () => {
    let filtered = [];
    if (selectedCapability.length > 0) {
      filtered = selectedCapability;
    }
    filtered = filtered.filter(
      (app) => app.spend >= spendRange[0] && app.spend <= spendRange[1]
    );
    setFilteredData(filtered);
  };

  const handleSelect = (apps: any) => {
    setSelectedCapability(apps);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <TreeView data={treeData} onSelect={handleSelect} />

        <RangeSlider
          initialMin={10000}
          initialMax={50000}
          min={0}
          max={100000}
          onChange={handleRangeChange}
        />
      </div>
      <div className="application-wrap">
        <ApplicationList data={filteredData} />
      </div>
    </div>
  );
};

export default App;
