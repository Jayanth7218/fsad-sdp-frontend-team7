import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getMarksByStudent } from "../../services/studentService";
import { useAuth } from "../../context/AuthContext";
import BarChartComponent from "../../components/charts/BarChartComponent";
import PieChartComponent from "../../components/charts/PieChartComponent";
import { getCategory } from "../../utils/categoryUtils";

const StudentAnalytics = () => {
  const { auth } = useAuth();
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    getMarksByStudent(auth.userId).then((res) => {
      const data = res || [];

      setBarData(
        data.map((m) => ({
          subject: m.subject.subjectName,
          marks: m.marksObtained,
        }))
      );

      const counts = {};

      data.forEach((m) => {
        const category = getCategory(m.marksObtained, m.maxMarks);
        counts[category] = (counts[category] || 0) + 1;
      });

      setPieData(
        Object.keys(counts).map((key) => ({
          name: key,
          value: counts[key],
        }))
      );
    });
  }, [auth.userId]);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">My Performance</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BarChartComponent data={barData} xKey="subject" yKey="marks" />
        <PieChartComponent data={pieData} />
      </div>
    </DashboardLayout>
  );
};

export default StudentAnalytics;