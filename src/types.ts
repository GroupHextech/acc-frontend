export interface Item {
[x: string]: any;
  item_id: number;
  item_name: string;
  
  id_item: number;
  name_item: string;
  //item_dtregister: Date
}
export interface Chassi {
  chassi_id: number;
}
export interface ServiceBulletins {
  service_bulleti_name: number;
  status: string;
  part: string;
}