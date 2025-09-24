"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Jan', uv: 850 },
  { name: 'Feb', uv: 400 },
  { name: 'Mar', uv: 700 },
  { name: 'Apr', uv: 500 },
  { name: 'May', uv: 700 },
  { name: 'June', uv: 300 },
  { name: 'July', uv: 900 },
  { name: 'Aug', uv: 700 },
  { name: 'Sep', uv: 300 },
  { name: 'Oct', uv: 850 },
  { name: 'Nov', uv: 600 },
  { name: 'Dec', uv: 700 },
];

const GrowthBar = () => {
  return (
    <ResponsiveContainer width="100%" height={250} style={{ border: 'none' }}>
      <BarChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: -25,
          bottom: 0,
        }}
      >
        
        <XAxis dataKey="name"
          axisLine={false}
          tickLine={false}
          padding={{ left: 9, right: 0 }}
          tick={{
            fill: '#5C5C5C',
            fontSize: 12,
            fontFamily: 'poppins'
          }}
        />
        <YAxis domain={[0, 1000]}
          ticks={[0, 200, 400, 600, 800, 1000]}
          axisLine={false}
          tickLine={false}
          tick={{
            fill: '#5C5C5C',
            fontSize: 12,
            fontFamily: 'poppins'
          }}
        />
        <Tooltip />
        <Bar
          dataKey="uv"
          fill="#FFC42D"
          barSize={12}
          fillOpacity={1}
          radius={[8, 8, 0, 0]}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index % 2 === 0 ? "#FFC42D" : "#FFC42D"}
              fillOpacity={index % 2 === 0 ? 1 : 0.6}
              

            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GrowthBar;