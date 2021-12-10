import { Component, OnInit } from '@angular/core';
import{CRUDService} from '../services/crud.service'
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent implements OnInit {

  // status 1:done 2:todo
  resourceUseageList = []
  productionList = []
  lotProd = null
  lotCntTarget = null
  lotCntAcutal = null
  lotId = null
  resourceMap = new Map()


  constructor(private crud: CRUDService) { }

  ngOnInit() {
    this.crud.getProductionList().subscribe(list => {
      this.productionList = list; 
    })
    
  }

  onStartLot(){
    this.crud.startPlot(this.lotProd, {
      "prod_cnt_target":this.lotCntTarget,
    }).subscribe(res => {
      this.lotId = res['lot_id']; 
      console.log("lotId : " + this.lotId)
    })

    this.crud.getProdRecipes(this.lotProd).subscribe(res => {
      this.resourceUseageList = res
      this.resourceUseageList.forEach((item, index) =>{item['uuid'] = uuidv4()})

      // 該当製品所要の原材料一覧を取得する
      res.forEach(item => this.resourceMap.set(item.resource_id, item.resource_name))
    })
  }

  onDeleteResource(idx){
    this.resourceUseageList.splice(idx,1)
  }

  onAddResource(){
    this.resourceUseageList.push({
      'uuid':uuidv4(),
      'resource_id': null,
      'resource_name': null,
      'resource_cnt': null,
      'price': null,
      'status': 2
    })
  }

  onCommitResource(){
    const commitResuouceUsageList = this.resourceUseageList.filter(ru => 
      ru['status'] !== 1 && ru['resource_id'] !== null && ru['resource_cnt'] !== null
    )

    this.crud.commitResourceUseage(this.lotId, commitResuouceUsageList).subscribe(res => {
      this.resourceUseageList.forEach(ru => {
        if(commitResuouceUsageList.some(cru => cru["uuid"] === ru["uuid"])){
          ru['status'] = 1
        }
      })
    })
  }

  onStopLot(){
    this.crud.stopPlot(this.lotId, {
      "prod_cnt":this.lotCntAcutal,
    }).subscribe(res => {
      this.lotId = null
    })
  }

}
