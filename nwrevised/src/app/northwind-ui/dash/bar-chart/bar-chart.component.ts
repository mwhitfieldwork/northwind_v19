import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit{
  data:number[] = [125,100, 50, 75, 200,125,80,65, 120, 100,300,120];
  xlabels:string[] = [  
    "Backpack",
    " Journal",
    "Pouch",
    "Flask",
    "Tote",
    "Roll",
    "Binder",
    "Wrap",
    "Satchel",
    "Case",
    "Crate",
    "Organizer"
  ];

  barChartType: 'bar' = 'bar';
  barChartData?: ChartData<'bar'> = {
    labels: this.xlabels.slice(0,5),
    datasets: [
      {
        label: 'categories',
        data: this.data.slice(0,5),
        backgroundColor: [
          "#FF6F61", "#FFB347", "#FFD700", "#FF8C00", "#FF4500",
          "#DC143C", "#E9967A", "#CD5C5C", "#FFA07A", "#F4A460", "#D2691E"
        ]
      }
    ]
  };

  barChartOptions!: ChartOptions<'bar'>;

  ngOnInit(): void {
    this.displayData('');
  }

  displayData(scope:string){
    console.log(scope);
    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'x', // vertical bars
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#999',
            font: {
              size: 12,
              weight: 'lighter'
            }
          }
        },
        y: {
          grid: {
            color: '#eee'
          },
          ticks: {
            color: '#999',
            font: {
              size: 12
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            color: '#666',
            font: {
              size: 13,
              weight: 'lighter'
            }
          }
        },
        tooltip: {
          backgroundColor: '#fff',
          titleColor: '#333',
          bodyColor: '#333',
          borderColor: '#ddd',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 6,
          displayColors: false
        }
      }
    };    
  }
}
