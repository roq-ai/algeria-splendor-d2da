import { StartupInterface } from 'interfaces/startup';
import { GetQueryInterface } from 'interfaces';

export interface HotelInterface {
  id?: string;
  name: string;
  price?: number;
  location?: string;
  availability?: boolean;
  rating?: number;
  startup_id?: string;
  created_at?: any;
  updated_at?: any;

  startup?: StartupInterface;
  _count?: {};
}

export interface HotelGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  location?: string;
  startup_id?: string;
}
