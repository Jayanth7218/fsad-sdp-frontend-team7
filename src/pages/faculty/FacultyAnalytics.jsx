import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getAllMarks } from "../../services/facultyService";
import BarChartComponent from "../../components/charts/BarChartComponent";
import PieChartComponent from "../../components/charts/PieChartComponent";
import { getCategory } from "../../utils/categoryUtils";

const FacultyAnalytics = () => {
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    getAllMarks().then((res) => {
      const data = res || [];

      const subjectMap = {};
      const categoryCount = {};

      data.forEach((m) => {
        const subject = m.subject.subjectName;

        if (!subjectMap[subject]) {
          subjectMap[subject] = { total: 0, count: 0 };
        }

        subjectMap[subject].total += m.marksObtained;
        subjectMap[subject].count += 1;

        const category = getCategory(m.marksObtained, m.maxMarks);
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      });

      setBarData(
        Object.keys(subjectMap).map((key) => ({
          subject: key,
          avg:
            subjectMap[key].total / subjectMap[key].count,
        }))
      );

      setPieData(
        Object.keys(categoryCount).map((key) => ({
          name: key,
          value: categoryCount[key],
        }))
      );
    });
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Class Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BarChartComponent data={barData} xKey="subject" yKey="avg" />
        <PieChartComponent data={pieData} />
      </div>
    </DashboardLayout>
  );
};

export default FacultyAnalytics;