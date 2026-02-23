
import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface StatisticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  idea: any;
}

type ChartType = 'line' | 'bar' | 'pie';

const StatisticsModal: React.FC<StatisticsModalProps> = ({ isOpen, onClose, idea }) => {
  const [chartType, setChartType] = useState<ChartType>('line');

  if (!isOpen || !idea) return null;

  // Mock historical data for the last 7 days
  const data = [
    { day: 'Mon', votes: Math.floor(idea.votes * 0.4) },
    { day: 'Tue', votes: Math.floor(idea.votes * 0.5) },
    { day: 'Wed', votes: Math.floor(idea.votes * 0.65) },
    { day: 'Thu', votes: Math.floor(idea.votes * 0.75) },
    { day: 'Fri', votes: Math.floor(idea.votes * 0.85) },
    { day: 'Sat', votes: Math.floor(idea.votes * 0.95) },
    { day: 'Sun', votes: idea.votes },
  ];

  const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff', '#4f46e5', '#4338ca'];

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVotes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="day" 
              stroke="#475569" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="#475569" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid #1e293b',
                borderRadius: '12px',
                fontSize: '12px'
              }}
              itemStyle={{ color: '#fff' }}
            />
            <Area 
              type="monotone" 
              dataKey="votes" 
              stroke="#6366f1" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorVotes)" 
            />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="day" 
              stroke="#475569" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="#475569" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              dx={-10}
            />
            <Tooltip 
              cursor={{ fill: '#1e293b', opacity: 0.4 }}
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid #1e293b',
                borderRadius: '12px',
                fontSize: '12px'
              }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar 
              dataKey="votes" 
              fill="#6366f1" 
              radius={[4, 4, 0, 0]} 
              barSize={30}
            />
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="votes"
              nameKey="day"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid #1e293b',
                borderRadius: '12px',
                fontSize: '12px'
              }}
              itemStyle={{ color: '#fff' }}
            />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div 
        className="absolute inset-0"
        onClick={onClose}
      />
      
      <div className="relative bg-[#080D1D] border border-gray-800 w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-fade-in-up">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-gray-800/50 flex justify-between items-center bg-[#0f172a]/30">
          <div>
            <h2 className="text-2xl font-bold text-white">Growth Statistics</h2>
            <p className="text-gray-500 text-sm">Tracking engagement for <span className="text-indigo-400 font-medium">{idea.title}</span></p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-white hover:bg-gray-800/50 rounded-full transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="bg-[#1e293b]/20 border border-gray-800/50 p-4 rounded-2xl">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Total Votes</p>
              <p className="text-2xl font-bold text-white">{idea.votes}</p>
              <p className="text-green-400 text-[10px] font-bold mt-1">+12% this week</p>
            </div>
            <div className="bg-[#1e293b]/20 border border-gray-800/50 p-4 rounded-2xl">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Waitlist</p>
              <p className="text-2xl font-bold text-white">{idea.waitlist}</p>
              <p className="text-indigo-400 text-[10px] font-bold mt-1">8 conversions today</p>
            </div>
            <div className="bg-[#1e293b]/20 border border-gray-800/50 p-4 rounded-2xl">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Confidence</p>
              <p className="text-2xl font-bold text-[#00BA9D]">{idea.score}%</p>
              <p className="text-gray-500 text-[10px] font-bold mt-1">High potential</p>
            </div>
          </div>

          <div className="flex flex-col h-80 w-full">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center">
                <span className="w-8 h-px bg-gray-800 mr-3" />
                Vote Trajectory (Last 7 Days)
              </h4>
              
              <div className="flex bg-[#1e293b]/50 p-1 rounded-xl border border-gray-800">
                <button 
                  onClick={() => setChartType('line')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${chartType === 'line' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Line
                </button>
                <button 
                  onClick={() => setChartType('bar')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${chartType === 'bar' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Bar
                </button>
                <button 
                  onClick={() => setChartType('pie')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${chartType === 'pie' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Pie
                </button>
              </div>
            </div>
            
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 sm:p-8 bg-[#0f172a]/50 border-t border-gray-800/50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white font-bold transition-all"
          >
            Close Insights
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatisticsModal;
