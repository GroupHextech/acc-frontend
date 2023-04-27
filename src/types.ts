export interface Item {
[x: string]: any;
  item_id: number;
  item_name: string;
  
  id_item: number;
  name_item: string;
  //item_dtregister: string;
}
export interface Chassi {
  chassi_id: number;
}
export interface ServiceBulletins {
  service_bulleti_name: string;
  status: string;
  part: string;
}
export interface ItemChassi {
  name_item: string;
  status: string;
}