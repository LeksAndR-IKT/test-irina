import React from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

interface DataPoint {
    x: string;
    y: number;
}

interface ScatterPlotProps {
    data: DataPoint[];
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
                <CartesianGrid />
                <XAxis dataKey="x" name="X Axis" unit="" />
                <YAxis dataKey="y" name="Y Axis" unit="градусов" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="Data Points" data={data} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default ScatterPlot;