import React from 'react';

const scenarios = [
  {
    label: 'Current',
    color: 'primary',
    lower: -0.8,
    upper: 2.2,
    mean: 0.7,
    bulb: 0.3,
    leaf: 0.4,
    width: 24
  },
  {
    label: '+5 Samples',
    color: 'secondary',
    lower: 0.2,
    upper: 1.2,
    mean: 0.7,
    bulb: 0.5,
    leaf: 0.2,
    width: 16
  }
];

const Bar = ({ scenario }) => {
  const bottom = ((scenario.lower + 10) / 20) * 100;
  const height = ((scenario.upper - scenario.lower) / 20) * 100;
  const meanPos = ((scenario.mean + 10) / 20) * 100;
  const barClass = scenario.color === 'primary' ? 'bg-primary/20' : 'bg-secondary/20';

  return (
    <div className="relative flex justify-center" style={{ width: `${scenario.width}px` }}>
      <div
        className={`${barClass} rounded`}
        style={{ position: 'absolute', bottom: `${bottom}%`, height: `${height}%`, width: '100%' }}
      />
      <div
        className="absolute bg-white rounded-full border border-gray-300"
        style={{ bottom: `${meanPos}%`, width: '8px', height: '8px', transform: 'translateX(-50%)', left: '50%' }}
      />
    </div>
  );
};

const Chip = ({ text, scenario, header = false }) => {
  const classes = scenario.color === 'primary'
    ? header
      ? 'bg-primary text-white'
      : 'bg-primary/10 text-gray-800'
    : header
      ? 'bg-secondary text-white'
      : 'bg-secondary/10 text-gray-800';

  return <div className={`${classes} h-8 px-3 rounded-full text-sm flex items-center`}>{text}</div>;
};

const YieldSummaryChart = () => (
  <div>
    <div className="w-full">
      <div className="relative h-[240px]">
        {[-10, -5, 0, 5, 10].map((val) => (
          <div
            key={val}
            className={`absolute left-0 right-0 ${val === 0 ? 'border-gray-300' : 'border-gray-200'} border-t`}
            style={{ bottom: `${((val + 10) / 20) * 100}%` }}
          />
        ))}
        <div className="absolute inset-0 flex justify-around items-end px-8 pb-6">
          {scenarios.map((s) => (
            <Bar key={s.label} scenario={s} />
          ))}
        </div>
      </div>
      <div className="mt-1 flex justify-around text-sm text-gray-600">
        {scenarios.map((s) => (
          <span key={s.label}>{s.label}</span>
        ))}
      </div>
    </div>

    <div className="mt-4 flex flex-wrap justify-center gap-2">
      <Chip text="Current" scenario={scenarios[0]} header />
      <Chip text={`Mean: ${scenarios[0].mean} t DM/ha`} scenario={scenarios[0]} />
      <Chip text={`Upper: ${scenarios[0].upper}`} scenario={scenarios[0]} />
      <Chip text={`Lower: ${scenarios[0].lower}`} scenario={scenarios[0]} />
      <Chip text={`Bulb: ${scenarios[0].bulb}`} scenario={scenarios[0]} />
      <Chip text={`Leaf: ${scenarios[0].leaf}`} scenario={scenarios[0]} />
      <div className="w-6" />
      <Chip text="+5 Samples" scenario={scenarios[1]} header />
      <Chip text={`Mean: ${scenarios[1].mean} t DM/ha`} scenario={scenarios[1]} />
      <Chip text={`Upper: ${scenarios[1].upper}`} scenario={scenarios[1]} />
      <Chip text={`Lower: ${scenarios[1].lower}`} scenario={scenarios[1]} />
      <Chip text={`Bulb: ${scenarios[1].bulb}`} scenario={scenarios[1]} />
      <Chip text={`Leaf: ${scenarios[1].leaf}`} scenario={scenarios[1]} />
    </div>
  </div>
);

export default YieldSummaryChart;
