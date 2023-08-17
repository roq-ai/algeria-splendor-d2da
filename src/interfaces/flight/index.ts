import { StartupInterface } from 'interfaces/startup';
import { GetQueryInterface } from 'interfaces';

export interface FlightInterface {
  id?: string;
  name: string;
  price?: number;
  origin?: string;
  destination?: string;
  departure_time?: any;
  arrival_time?: any;
  startup_id?: string;
  created_at?: any;
  updated_at?: any;

  startup?: StartupInterface;
  _count?: {};
}

export interface FlightGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  origin?: string;
  destination?: string;
  startup_id?: string;
}
