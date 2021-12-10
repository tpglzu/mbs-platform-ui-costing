import { Component, OnInit, OnDestroy } from '@angular/core';
import{CRUDService} from '../services/crud.service'
declare var echarts: any;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit, OnDestroy {

  myChart = null
  productionList = []
  prodId = 1
  viewType = "hourly"
  period = "2021-12-4~2021-12-10"

  viewTypeDefineList = [
    {
      "value":"hourly",
      "name":"時次"
    },{
      "value":"daily",
      "name":"日次"
    },{
      "value":"weekly",
      "name":"週次"
    },{
      "value":"monthly",
      "name":"月次"
    }
  ]


  constructor(private crud: CRUDService) { }

  ngOnInit() {
      this.crud.getProductionList().subscribe(list => {
        this.productionList = list; 
      })
  }

  onView(){
    const prodName = this.productionList.filter(x => x['id'] === this.prodId)[0].name
    const typeName = this.viewTypeDefineList.filter(x => x['value'] === this.viewType)[0].name
    console.log(`prodId:${this.prodId}, prodName:${prodName}, viewType:${this.viewType},  vietypeNamewType:${typeName}, period:${this.period}`)
    const dates = this.period.split('~')
    const startDate = dates[0].trim()
    const endDate = dates[1].trim()
    this.crud.getTimeSeriesView(this.prodId, this.viewType, startDate, endDate).subscribe(mapObj =>{
      var xAxisData = []
      var series1Data = []
      var series2Data = []

      for (var key in mapObj) {
        xAxisData.push(key)
        series1Data.push(mapObj[key][0])
        series2Data.push(mapObj[key][1])
      }

      this.myChart = echarts.init(document.getElementById('main'));

      // Specify the configuration items and data for the chart
      var option = {
        title: {
          text: `${prodName}の${typeName}原価変動`
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['実績', '計画']
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '実績',
            data: series1Data,
            type: 'line'
          },
          {
            name: '計画',
            data: series2Data,
            type: 'line'
          }
        ]
      };

      // Display the chart using the configuration items and data just specified.
      this.myChart.setOption(option);
    })
  }

  ngOnDestroy(){
    if(this.myChart !== null){
      this.myChart.dispose()
    }
  }

}
