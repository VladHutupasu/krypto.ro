import { ChartOptions, CrosshairMode, DeepPartial } from 'lightweight-charts';

export const chartOptions: DeepPartial<ChartOptions> = {
  height: 450,
  autoSize: true,
  rightPriceScale: {
    scaleMargins: {
      top: 0.2,
      bottom: 0,
    },
  },
  overlayPriceScales: {
    scaleMargins: {
      top: 0.8,
      bottom: 0,
    },
  },
  layout: {
    background: { color: 'transparent' },
    textColor: '#a6adba',
    fontFamily: 'Inter',
  },
  grid: {
    vertLines: {
      color: '#a6adba00',
    },
    horzLines: {
      color: '#a6adba45',
    },
  },
  crosshair: {
    mode: CrosshairMode.Normal,
  },
};
