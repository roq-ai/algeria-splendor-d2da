import { StartupInterface } from 'interfaces/startup';
import { GetQueryInterface } from 'interfaces';

export interface OfferInterface {
  id?: string;
  name: string;
  description?: string;
  price?: number;
  availability?: boolean;
  rating?: number;
  startup_id?: string;
  created_at?: any;
  updated_at?: any;

  startup?: StartupInterface;
  _count?: {};
}

export interface OfferGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  startup_id?: string;
}
