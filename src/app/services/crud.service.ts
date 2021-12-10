import {RestService} from './rest.service';
import {Injectable} from '@angular/core';
import {formatDate} from  '@angular/common'

@Injectable()
export class CRUDService {

  plan_id = 1
  host = "http://localhost:8090/msb-platform-gateway"
  api_productions = `${this.host}/productions`
  api_startlot = `${this.host}/plan/${this.plan_id}/lot/start/{prod_id}`
  api_prodrecipes = `${this.host}/production/{prod_id}/recipes`
  api_commitResoueceUseage = `${this.host}/lot/{lot_id}/resource_usage?datetime={datetime}`
  api_stoplot = `${this.host}/lot/{lot_id}/stop`
  api_priceTimeSeries = `${this.host}/plan/${this.plan_id}/production/{prod_id}/price/{type}?start_date={start_date}&end_date={end_date}`

  constructor(private rs: RestService) {}

  public getProductionList(){
    return this.rs.get(this.api_productions)
  }

  public startPlot(prodId, body){
    return this.rs.post(
      this.renderString(this.api_startlot, {'prod_id': prodId}), 
      this.wrapperRequestBody(body))
  }

  public getProdRecipes(prodId){
    return this.rs.get(this.renderString(this.api_prodrecipes,{'prod_id': prodId}))
  }

  public commitResourceUseage(lotId, body){
    return this.rs.post(this.renderString(this.api_commitResoueceUseage,{
      'lot_id': lotId,
      'datetime':this.formattDate()
    }), body)
  }

  public stopPlot(lotId, body){
    return this.rs.post(this.renderString(this.api_stoplot,{'lot_id': lotId}), this.wrapperRequestBody(body))
  }

  public getTimeSeriesView(prodId, viewType, startDate, endDate){
    return this.rs.get(this.renderString(this.api_priceTimeSeries,{
      'prod_id': prodId,
      'type':viewType,
      'start_date': startDate,
      'end_date': endDate
    }))
  }

  private renderString(template, value){
    return template.replace(/{\w+}/g, placeholder =>
      value[placeholder.substring(1, placeholder.length - 1)] || placeholder
    );
  }

  private wrapperRequestBody(body){ 
    body.datetime=this.formattDate()
    return body
  }

  private formattDate(){
    const format = 'yyyy-MM-dd HH:mm:ss';
    const locale = 'en-US';
    const formattedDate = formatDate(Date.now(), format, locale);
    return formattedDate;
  }

}