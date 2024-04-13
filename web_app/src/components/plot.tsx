import React from 'react';
import Plot from 'react-plotly.js';

export function SentimentPlot({
  data,
  title,
  color
}: {
  data: any[];
  title: string;
  color: string;
}) {
  let x = [];
  let y = [];

  for (let i = 0; i < data.length; i++) {
    if (i % 2 === 0) {
      x.push(data[i]);
    } else {
      y.push(data[i]);
    }
  }

  const colors = {
    one_color: [
      '#084893',
      '#084893',
      '#084893',
      '#084893',
      '#084893',
      '#084893'
    ],
    multi: ['#9a0000', '#00d86d', '#ffd83d']
  };
  let c;
  if (color === 'one_color') {
    c = colors.one_color;
  } else {
    c = colors.multi;
  }

  return (
    <div className="bg-white rounded-lg hover:shadow-lg transition-all p-4">
      <Plot
        data={[
          {
            x: x,
            y: y,
            type: 'bar',
            textinfo: 'label+percent',
            marker: {
              color: c
            }
          }
        ]}
        layout={{
          title: title,
          font: {
            color: 'black'
          }
        }}
        className="w-full h-full rounded-lg"
        useResizeHandler={true}
      />
    </div>
  );
}
