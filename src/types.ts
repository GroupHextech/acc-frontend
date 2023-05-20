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
export interface ServiceBulletin {
  name: string;
  part: string;
}
export interface ItemChassi {
  name_item: string;
  status: string;
}
export interface Permission {
  id: number;
  name: string;
}
export interface User {
  username: string;
  password: string;
  userType: Permission;
}