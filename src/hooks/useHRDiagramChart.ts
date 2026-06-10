import { useEffect } from 'react';
import * as d3 from 'd3';
import type { Star } from '../data/stars';
import type { ModelStar } from '../utils/physics';
import { getSpectralColor, getCategoryOpacity } from '../utils/spectralColors';

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  star: Star | null;
}

interface D3ChartConfig {
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
}

const DEFAULT_CONFIG: D3ChartConfig = {
  width: 800,
  height: 600,
  margin: { top: 40, right: 60, bottom: 80, left: 80 },
};

export function useHRDiagramChart(
  svgRef: React.RefObject<SVGSVGElement | null>,
  stars: Star[],
  modelStar: ModelStar | undefined,
  onTooltip: (tooltip: TooltipState) => void,
  config: Partial<D3ChartConfig> = {},
) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const { width, height, margin } = finalConfig;
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  useEffect(() => {
    if (!svgRef.current || stars.length === 0) return;

    // Create scales
    const tempExtent = d3.extent(stars, (d) => d.temperature) as [
      number,
      number,
    ];
    const tempScale = d3
      .scaleLinear()
      .domain([tempExtent[1], tempExtent[0]])
      .range([0, chartWidth]);

    const luminosityExtent = d3.extent(stars, (d) => d.luminosity) as [
      number,
      number,
    ];
    const luminosityScale = d3
      .scaleLog()
      .domain([luminosityExtent[0] * 0.1, luminosityExtent[1] * 10])
      .range([chartHeight, 0]);

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Add background
    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#0f172a');

    // Create main group
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add gridlines
    const xGridlines = d3
      .axisBottom(tempScale)
      .tickSize(-chartHeight)
      .tickFormat(() => '');
    g.append('g')
      .attr('class', 'gridlines-x')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xGridlines)
      .style('stroke', 'rgba(255,255,255,0.08)')
      .style('stroke-dasharray', '4,4');

    const yGridlines = d3
      .axisLeft(luminosityScale)
      .tickSize(-chartWidth)
      .tickFormat(() => '');
    g.append('g')
      .attr('class', 'gridlines-y')
      .call(yGridlines)
      .style('stroke', 'rgba(255,255,255,0.08)')
      .style('stroke-dasharray', '4,4');

    // Add axes
    const xAxis = d3.axisBottom(tempScale).ticks(8);
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxis)
      .style('color', '#b8c7d4')
      .select('.domain')
      .style('stroke', 'rgba(255,255,255,0.12)');

    const yAxis = d3.axisLeft(luminosityScale).ticks(6);
    g.append('g')
      .call(yAxis)
      .style('color', '#b8c7d4')
      .select('.domain')
      .style('stroke', 'rgba(255,255,255,0.12)');

    // Add axis labels
    g.append('text')
      .attr('x', chartWidth / 2)
      .attr('y', chartHeight + 60)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', '#b8c7d4')
      .style('font-weight', '500')
      .text('Temperature (K) — reversed →');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left + 20)
      .attr('x', 0 - chartHeight / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', '#b8c7d4')
      .style('font-weight', '500')
      .text('Luminosity (L☉) — log scale');

    // Plot stars
    g.selectAll('.star-point')
      .data(stars, (d: any) => d.name)
      .join('circle')
      .attr('class', 'star-point')
      .attr('cx', (d) => tempScale(d.temperature))
      .attr('cy', (d) => luminosityScale(d.luminosity))
      .attr('r', 5)
      .attr('fill', (d) => getSpectralColor(d.spectralClass))
      .attr('opacity', (d) => getCategoryOpacity(d.category))
      .attr('stroke', 'rgba(255,255,255,0.18)')
      .attr('stroke-width', 1.5)
      .style('cursor', 'pointer')
      .on('mouseenter', function (event, d) {
        onTooltip({
          visible: true,
          x: event.clientX,
          y: event.clientY,
          star: d,
        });

        d3.select(this)
          .transition()
          .duration(150)
          .attr('r', 7)
          .attr('opacity', 1)
          .attr('stroke-width', 2.5);
      })
      .on('mousemove', function (event, d) {
        onTooltip({
          visible: true,
          x: event.clientX,
          y: event.clientY,
          star: d,
        });
      })
      .on('mouseleave', function () {
        const d = d3.select(this).datum() as any;
        onTooltip({ visible: false, x: 0, y: 0, star: null });

        d3.select(this)
          .transition()
          .duration(150)
          .attr('r', 5)
          .attr('opacity', getCategoryOpacity(d.category))
          .attr('stroke-width', 1.5);
      });

    // Plot model star if provided
    if (modelStar) {
      const modelX = tempScale(modelStar.temperature);
      const modelY = luminosityScale(modelStar.luminosity);

      const modelStarDatum: Star = {
        name: `Model Star (M=${modelStar.mass.toFixed(2)} M☉)`,
        temperature: modelStar.temperature,
        luminosity: modelStar.luminosity,
        radius: modelStar.radius,
        spectralClass: modelStar.spectralClass,
        category: 'main-sequence',
      };

      g.selectAll('.model-star-glow').remove();
      g.append('circle')
        .attr('class', 'model-star-glow')
        .attr('cx', modelX)
        .attr('cy', modelY)
        .attr('r', 10)
        .attr('fill', '#5de2ff')
        .attr('opacity', 0.15);

      g.selectAll('.model-star-ring').remove();
      g.append('circle')
        .attr('class', 'model-star-ring')
        .attr('cx', modelX)
        .attr('cy', modelY)
        .attr('r', 8)
        .attr('fill', 'none')
        .attr('stroke', '#5de2ff')
        .attr('stroke-width', 2.5)
        .attr('opacity', 0.8)
        .attr('stroke-dasharray', '3,3');

      g.selectAll('.model-star-point').remove();
      g.append('circle')
        .attr('class', 'model-star-point')
        .attr('cx', modelX)
        .attr('cy', modelY)
        .attr('r', 6)
        .attr('fill', '#5de2ff')
        .attr('opacity', 0.95)
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .style('cursor', 'help')
        .on('mouseenter', function (event) {
          onTooltip({
            visible: true,
            x: event.clientX,
            y: event.clientY,
            star: modelStarDatum,
          });
          d3.select(this)
            .transition()
            .duration(150)
            .attr('r', 8)
            .attr('stroke-width', 2.5);
        })
        .on('mousemove', function (event) {
          onTooltip({
            visible: true,
            x: event.clientX,
            y: event.clientY,
            star: modelStarDatum,
          });
        })
        .on('mouseleave', function () {
          onTooltip({ visible: false, x: 0, y: 0, star: null });
          d3.select(this)
            .transition()
            .duration(150)
            .attr('r', 6)
            .attr('stroke-width', 2);
        });
    }
  }, [stars, modelStar, onTooltip, chartWidth, chartHeight, margin]);
}
